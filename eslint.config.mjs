import { defineConfig, globalIgnores } from "eslint/config";
import eslintIgnorePatterns from "./.eslintignore.mjs";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  {
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
  },
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    files: ["*.cjs", "scripts/**/*.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  globalIgnores(eslintIgnorePatterns),
]);

export default eslintConfig;
