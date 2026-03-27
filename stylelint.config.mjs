const utilityAtRules = ["unocss", "apply", "screen"];

const stylelintConfig = {
  extends: ["stylelint-config-standard-scss"],
  ignoreFiles: [
    ".next/**",
    ".reports/**",
    "node_modules/**",
    "out/**",
    "build/**",
    "coverage/**",
  ],
  overrides: [
    {
      files: ["**/*.css"],
      rules: {
        "at-rule-no-unknown": [true, { ignoreAtRules: utilityAtRules }],
        "scss/at-rule-no-unknown": null,
      },
    },
    {
      files: ["**/*.scss"],
      customSyntax: "postcss-scss",
      rules: {
        "at-rule-no-unknown": null,
        "scss/at-rule-no-unknown": [true, { ignoreAtRules: utilityAtRules }],
      },
    },
  ],
  rules: {
    "import-notation": null,
  },
};

export default stylelintConfig;
