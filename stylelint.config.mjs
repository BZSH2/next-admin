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
  "responsive",
  "screen",
];

const stylelintConfig = {
  extends: ["stylelint-config-standard"],
  ignoreFiles: [".next/**", "node_modules/**", "out/**", "build/**"],
  rules: {
    "at-rule-no-unknown": [true, { ignoreAtRules: tailwindAtRules }],
    "import-notation": null,
  },
};

export default stylelintConfig;
