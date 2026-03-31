const utilityAtRules = ['unocss', 'apply', 'screen', 'layer', 'responsive', 'variants', 'defs'];

const stylelintConfig = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recommended'],
  ignoreFiles: [
    '.next/**',
    '.reports/**',
    'node_modules/**',
    'out/**',
    'build/**',
    'coverage/**',
    '.github/deploy/**',
  ],
  overrides: [
    {
      files: ['**/*.css'],
      rules: {
        'at-rule-no-unknown': [true, { ignoreAtRules: utilityAtRules }],
        'scss/at-rule-no-unknown': null,
        'color-named': 'never',
        'color-no-hex': null,
        'function-url-no-scheme-relative': true,
        'selector-pseudo-class-no-unknown': [
          true,
          {
            ignorePseudoClasses: ['global'],
          },
        ],
      },
    },
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
      rules: {
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': [true, { ignoreAtRules: utilityAtRules }],
        'scss/dollar-variable-pattern': [/^__/],
        'scss/percent-placeholder-pattern': [/^%/],
        'scss/at-mixin-pattern': [/^[a-z][a-zA-Z0-9-]+$/],
      },
    },
  ],
  rules: {
    'import-notation': null,
    'no-empty-source': null,
    'no-duplicate-selectors': true,
    'no-invalid-position-at-import-rule': true,
    'function-url-quotes': 'always',
    'selector-class-pattern': /^[a-z][a-zA-Z0-9]*(?:-[a-zA-Z0-9]+)*(?:--[a-zA-Z0-9]+)*$/,
    'selector-id-pattern': /^[a-z][a-zA-Z0-9]*$/,
    'selector-max-compound-selectors': 4,
    'selector-max-type': 2,
    'selector-max-universal': 1,
    'selector-no-vendor-prefix': null,
    'property-no-vendor-prefix': null,
    'font-family-no-duplicate-names': null,
    'value-keyword-case': ['lower', { ignoreProperties: [/^(font|font-family)$/] }],
    'value-no-vendor-prefix': true,
    'keyframes-name-pattern': /^[a-z][a-zA-Z0-9]*(-[a-z][a-zA-Z0-9]*)*$/,
    'declaration-block-single-line-max-declarations': 1,
    'declaration-no-important': null,
    'shorthand-property-no-redundant-values': true,
    'unit-allowed-list': ['px', 'em', 'rem', '%', 'vh', 'vw', 'vmin', 'vmax', 's', 'ms'],
  },
};

export default stylelintConfig;
