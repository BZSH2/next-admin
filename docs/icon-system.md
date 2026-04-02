# 自定义 SVG 与 Icon 组件实现

## 目标

- 统一项目内 SVG 图标的命名与使用方式
- 在页面中通过 `<Icon iconName="..." />` 动态加载图标
- 避免中文、连接符、大驼峰等命名混用带来的维护成本

## 核心位置

- SVG 目录：`src/Icon/svg`
- Icon 组件：`src/Icon/index.tsx`
- 图标重命名脚本：`scripts/renameSvg/index.ts`
- 命令入口：`pnpm renameSvg`

## 命名规范

- SVG 文件名统一使用英文小驼峰（`lowerCamelCase`）
- 目录名可用于业务分组，例如：`menus`、`layout`
- 禁止使用中文、空格、连接符（`-`）和大驼峰文件名
- 示例：
  - `src/Icon/svg/menus/blackCat.svg`
  - `src/Icon/svg/layout/warningOutline.svg`

## Icon 加载规则

- 使用方式：`import Icon from '@/Icon'`
- 基础调用：`<Icon iconName="menus/blackCat" size={18} />`
- `iconName` 支持两种候选路径解析：
  - 直接路径：`iconName` 原值，例如 `menus/blackCat`
  - 单个 `-` 分段路径：把第一个 `-` 转成 `/`，例如 `menus-blackCat` -> `menus/blackCat`

## renameSvg 脚本行为

- 扫描 `src/Icon/svg` 下全部 `.svg` 文件
- 将文件名统一转换为小驼峰
- 支持中文文件名自动转拼音后再生成小驼峰
- 对以数字开头的结果自动补前缀 `icon`
- 使用临时文件名两阶段重命名，避免大小写重命名冲突
- 重名冲突会直接抛错并终止，避免覆盖文件

## 使用方式

```bash
pnpm renameSvg
```

```tsx
import Icon from '@/Icon';

<Icon iconName="menus/blackCat" size={18} className="text-slate-700" />;
```
