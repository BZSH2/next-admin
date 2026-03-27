const { spawn } = require("node:child_process");
const fs = require("node:fs/promises");
const path = require("node:path");
const uncss = require("uncss");
const config = require("../uncss.config.cjs");

const projectRoot = path.resolve(__dirname, "..");
const nextBin = require.resolve("next/dist/bin/next");

function parseBoolean(value) {
  if (!value) {
    return false;
  }

  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

function toPosixPath(filePath) {
  return filePath.split(path.sep).join("/");
}

function getRoutes() {
  const envRoutes = process.env.UNCSS_ROUTES?.trim();

  if (!envRoutes) {
    return config.routes;
  }

  return envRoutes
    .split(",")
    .map((route) => route.trim())
    .filter(Boolean);
}

function runNextCommand(args, label) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [nextBin, ...args], {
      cwd: projectRoot,
      stdio: "inherit",
      env: process.env,
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${label} failed with exit code ${code ?? "unknown"}.`));
    });
  });
}

function runUncss(targets, options) {
  return new Promise((resolve, reject) => {
    uncss(targets, options, (error, output, report) => {
      if (error) {
        reject(error);
        return;
      }

      resolve({ output, report });
    });
  });
}

function stripScripts(html) {
  return html.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    "",
  );
}

function extractStylesheetHrefs(html) {
  const hrefs = [];

  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const tag = match[0];

    if (!/\brel=["'][^"']*stylesheet[^"']*["']/i.test(tag)) {
      continue;
    }

    const hrefMatch = tag.match(/\bhref=["']([^"']+)["']/i);
    const href = hrefMatch?.[1]?.trim();

    if (!href) {
      continue;
    }

    hrefs.push(href);
  }

  return hrefs;
}

async function findExistingFile(candidates) {
  for (const candidate of candidates) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      // Try the next candidate.
    }
  }

  return null;
}

function routeToCandidates(route) {
  const pathname = route.split(/[?#]/, 1)[0].replace(/^\/+|\/+$/g, "");
  const appDir = path.resolve(projectRoot, ".next/server/app");

  if (!pathname) {
    return [path.join(appDir, "index.html")];
  }

  return [
    path.join(appDir, `${pathname}.html`),
    path.join(appDir, pathname, "index.html"),
  ];
}

async function resolveBuiltHtmlFile(route) {
  const htmlFile = await findExistingFile(routeToCandidates(route));

  if (!htmlFile) {
    throw new Error(
      `Could not find a prerendered HTML file for route \"${route}\" under .next/server/app.`,
    );
  }

  return htmlFile;
}

function resolveStylesheetPath(href, htmlFile) {
  if (/^https?:\/\//i.test(href)) {
    return href;
  }

  if (href.startsWith("/_next/")) {
    return path.resolve(projectRoot, ".next", href.replace(/^\/_next\//, ""));
  }

  if (href.startsWith("/")) {
    return path.resolve(projectRoot, "public", href.slice(1));
  }

  return path.resolve(path.dirname(htmlFile), href);
}

async function loadBuiltPages(routes) {
  const pages = await Promise.all(
    routes.map(async (route) => {
      const htmlFile = await resolveBuiltHtmlFile(route);
      const html = await fs.readFile(htmlFile, "utf8");
      const stylesheets = extractStylesheetHrefs(html).map((href) =>
        resolveStylesheetPath(href, htmlFile),
      );

      return {
        route,
        htmlFile,
        html: stripScripts(html),
        stylesheets,
      };
    }),
  );
  const stylesheets = [...new Set(pages.flatMap((page) => page.stylesheets))];

  if (stylesheets.length === 0) {
    throw new Error("No stylesheets were found in the prerendered HTML files.");
  }

  return {
    htmlFiles: pages.map((page) =>
      toPosixPath(path.relative(projectRoot, page.htmlFile)),
    ),
    htmlPages: pages.map((page) => page.html),
    stylesheets,
  };
}

async function ensureDirFor(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function main() {
  const routes = getRoutes();
  const outputFile = path.resolve(
    projectRoot,
    process.env.UNCSS_OUTPUT_FILE?.trim() || config.outputFile,
  );
  const reportFile = path.resolve(
    projectRoot,
    process.env.UNCSS_REPORT_FILE?.trim() || config.reportFile,
  );
  const shouldBuild = !parseBoolean(process.env.UNCSS_SKIP_BUILD);
  const uncssOptions = {
    ignore: config.ignore ?? [],
    ignoreSheets: config.ignoreSheets ?? [],
    inject: config.inject ?? null,
    report: true,
    timeout: Number(process.env.UNCSS_TIMEOUT || config.timeout || 0),
  };

  if (shouldBuild) {
    console.log("Building Next.js app for UnCSS analysis...");
    await runNextCommand(["build"], "next build");
  }

  console.log(`Analyzing routes: ${routes.join(", ")}`);

  const { htmlFiles, htmlPages, stylesheets } = await loadBuiltPages(routes);
  const { output, report } = await runUncss(htmlPages, {
    ...uncssOptions,
    stylesheets,
  });
  const originalBytes = Buffer.byteLength(report?.original ?? "", "utf8");
  const optimizedBytes = Buffer.byteLength(output, "utf8");
  const removedBytes = Math.max(originalBytes - optimizedBytes, 0);
  const reduction =
    originalBytes === 0
      ? 0
      : Number(((removedBytes / originalBytes) * 100).toFixed(2));

  await Promise.all([ensureDirFor(outputFile), ensureDirFor(reportFile)]);
  await fs.writeFile(outputFile, output, "utf8");
  await fs.writeFile(
    reportFile,
    JSON.stringify(
      {
        analyzedAt: new Date().toISOString(),
        routes,
        htmlFiles,
        stylesheets: stylesheets.map((filePath) =>
          /^https?:\/\//i.test(filePath)
            ? filePath
            : toPosixPath(path.relative(projectRoot, filePath)),
        ),
        summary: {
          originalBytes,
          optimizedBytes,
          removedBytes,
          reduction,
        },
        selectors: report?.selectors ?? {},
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log(
    [
      "UnCSS analysis completed.",
      `Output: ${toPosixPath(path.relative(projectRoot, outputFile))}`,
      `Report: ${toPosixPath(path.relative(projectRoot, reportFile))}`,
      `Reduced CSS by ${reduction}% (${removedBytes} bytes).`,
    ].join("\n"),
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
