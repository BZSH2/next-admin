# next-admin

一个基于 Next.js App Router 的后台项目。

## 核心说明

- 技术栈：Next.js App Router + TypeScript + UnoCSS + Ant Design
- 包管理器：pnpm
- 菜单来源：页面 `definePageMeta` 元信息自动生成
- SVG 方案：统一 `Icon` 组件加载 `src/Icon/svg` 中的资源
- 发布链路：GitHub Actions + Docker + 服务器部署

## 本地开发

```bash
pnpm install
pnpm dev
```

默认访问：<http://localhost:3000>

## 文档索引

- [自定义 SVG 与 Icon 组件实现](./docs/icon-system.md)
- [菜单元信息与自动生成实现](./docs/menu-generation.md)
- [部署与发布实现](./docs/deployment.md)
- [CI 工作流说明](./docs/ci-workflow.md)
- [Lint 与提交校验说明](./docs/lint-and-git-hooks.md)
