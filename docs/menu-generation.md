# 菜单元信息与自动生成实现

## 目标

- 在页面文件中声明菜单元信息
- 通过脚本自动生成统一菜单配置
- 减少手写菜单与页面定义不一致的问题

## 核心位置

- 页面元信息工具：`src/utils/meta.ts`
- 页面元信息类型：`src/types/pageMeta.d.ts`
- 菜单生成脚本：`scripts/generateMenu/index.ts`
- 生成结果文件：`src/config/menu.ts`

## 使用方式

1. 在页面中调用 `definePageMeta`
2. 配置 `title`、`icon`、`sort` 等字段
3. 执行脚本生成最新菜单配置

## 示例

```tsx
import { definePageMeta } from '@/utils/meta'

export const { pageMeta, metadata } = definePageMeta({
  title: '用户管理',
  icon: 'UserOutlined',
  sort: 1,
})
```
