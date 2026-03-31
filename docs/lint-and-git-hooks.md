# Lint 与提交校验说明

## 质量校验入口

- 汇总校验命令：`pnpm check`
- Lint 校验：`pnpm check:lint`
- 格式校验：`pnpm check:format`

## 具体校验项

- ESLint：`eslint . --max-warnings=0`
- Stylelint：`stylelint "**/*.{css,scss}" --allow-empty-input`
- Prettier：`prettier . --check`

## Git Hook 策略

- `pre-commit`：
  - `pnpm exec lint-staged`
  - `pnpm run check`
- `pre-push`：
  - 当前为直接通过，不重复执行校验

## 常用修复命令

- 一键修复 lint 与格式：`pnpm lint:fix`
- 全量格式化：`pnpm format`

## 提交流程建议

1. 本地开发完成后先执行 `pnpm lint:fix`
2. 提交前执行 `pnpm check`
3. 使用 `pnpm cz` 生成规范提交信息
