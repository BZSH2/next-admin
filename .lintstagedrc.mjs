import path from "node:path";
import { fileURLToPath } from "node:url";

const cwd = fileURLToPath(new URL(".", import.meta.url));

const toCliArgs = (filenames) =>
  filenames
    .map((filename) => path.relative(cwd, filename).split(path.sep).join("/"))
    .map((filename) => `"${filename}"`)
    .join(" ");

const buildCommand = (baseCommand) => (filenames) =>
  `${baseCommand} ${toCliArgs(filenames)}`;

const lintStagedConfig = {
  "*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}": [
    buildCommand("eslint --fix --max-warnings=0"),
    buildCommand("prettier --write"),
  ],
  "*.{css,scss}": [
    buildCommand("stylelint --fix --allow-empty-input"),
    buildCommand("prettier --write"),
  ],
  "*.{json,md,mdx,yml,yaml}": [buildCommand("prettier --write")],
};

export default lintStagedConfig;
