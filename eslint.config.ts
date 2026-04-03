import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'
import { defineConfig, globalIgnores } from 'eslint/config'
import { readFileSync } from 'node:fs'

const eslintIgnorePatterns: string[] = JSON.parse(
  readFileSync(new URL('./.eslintignore.json', import.meta.url), 'utf8')
)

const eslintConfig = defineConfig([
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}'],
    rules: {
      semi: ['error', 'never'],
      'no-debugger': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-alert': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-var': 'error',
      'prefer-const': [
        'error',
        {
          destructuring: 'all',
        },
      ],
      'object-shorthand': ['error', 'always'],
      'no-useless-return': 'error',
      'no-duplicate-imports': [
        'error',
        {
          includeExports: true,
          allowSeparateTypeImports: true,
        },
      ],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'error',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': true,
          'ts-nocheck': true,
          'ts-check': false,
          minimumDescriptionLength: 6,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['*.cjs', 'scripts/**/*.cjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['scripts/**/*.{js,ts,mjs,cjs,mts,cts}'],
    rules: {
      'no-console': 'off',
      'no-new-func': 'off',
    },
  },
  globalIgnores(eslintIgnorePatterns),
])

export default eslintConfig
