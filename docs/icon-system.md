# 自定义 SVG 与 Icon 组件实现

## 目标

- 统一项目内自定义图标的使用方式
- 在页面中通过 `<Icon iconName="..." />` 快速调用
- 降低图标路径和导入成本

## 目录约定

- SVG 文件目录：`src/Icon/svg`
- Icon 组件入口：`src/Icon/index.tsx`
- 页面导入方式：`import Icon from '@/Icon'`

## 命名与映射规则

- 推荐文件命名使用 `kebab-case`
- `iconName="layout-collapsed"` 可映射到：
  - `src/Icon/svg/layout-collapsed.svg`
  - `src/Icon/svg/layout/collapsed.svg`

## 使用示例

```tsx
import Icon from '@/Icon';

<Icon iconName="layout-collapsed" size={18} className="text-slate-700" />;
```
