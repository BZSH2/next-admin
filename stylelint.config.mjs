const tailwindAtRules = [
  "theme",
  "source",
  "utility",
  "variant",
  "custom-variant",
  "plugin",
  "config",
  "apply",
  "layer",
  "reference",
  "responsive",
  "screen",
];

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
        "at-rule-no-unknown": [true, { ignoreAtRules: tailwindAtRules }],
        "scss/at-rule-no-unknown": null,
      },
    },
    {
      files: ["**/*.scss"],
      customSyntax: "postcss-scss",
      rules: {
        "at-rule-no-unknown": null,
        "scss/at-rule-no-unknown": [true, { ignoreAtRules: tailwindAtRules }],
      },
    },
  ],
  rules: {
    "import-notation": null,
  },
};

export default stylelintConfig;
