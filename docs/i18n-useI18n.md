# useI18n 使用规范

## 目标

- 统一项目内国际化调用入口，避免每个组件各自处理缺失文案异常。
- 约束翻译函数的获取方式，保持 Hook 调用规则一致。

## 目录结构与语言加载

- 语言包位置：`src/i18n/languages/*.json`
- 短码规则：`zh-CN -> zh`、`en-US -> en`、`ja-JP -> ja` 等（文件名为短码）
- 服务端加载：`src/i18n/request.ts` 读取 `NEXT_LOCALE` Cookie（短码）并加载对应的 `*.json`
- 语言配置：`src/config/locale.config.ts` 声明 BCP47 代码与翻译短码映射（`translateCode`）

## 统一导入方式

- 推荐导入：`import { useI18n } from '@I18n'`
- 别名来源：`tsconfig.json` 中将 `@I18n` 映射到 `src/hooks/useI18n`

## 使用方式

### 无命名空间

```ts
import { useI18n } from '@I18n'

const { t } = useI18n()
```

### 有命名空间

```ts
import { useI18n } from '@I18n'

const { t } = useI18n({ namespace: 'common' })
```

## 返回值说明

- `t(key, strict?)`：安全翻译函数。默认 key 缺失时返回空字符串；传入第二个参数 `true` 时抛出错误。
- `rawT`：`next-intl` 原始翻译函数，保留完整能力。
- `has`：判断 key 是否存在于当前 locale + namespace。

### 严格模式示例

```ts
const { t } = useI18n()

const softText = t('menu.logout')
const strictText = t('menu.logout', true)
```

## 菜单与标签页国际化

- 菜单：在 Sidebar 的 `Menu` 组件中，菜单项标题使用 `t(item.title) || item.title` 渲染（兜底原文）
- 标签页：`PageTabs` 将 `menuConfig` 拍平为 `path -> title` 映射，语言切换时派发 `syncTitles` 同步已打开标签页标题
- 默认首页 Tab 的存在与不可关闭逻辑收敛在 `tabsSlice` 中，组件仅负责派发

## 页面 metadata 国际化

- 页面使用 `definePageMeta({...})` 定义 `title/description`
- `definePageMeta` 返回 `generateMetadata`，在服务端通过 `getMessages()` 按当前语言输出 `title/description`
- 页面结构保持解构式使用：`export const { pageMeta, metadata, generateMetadata } = definePageMeta({...})`

## 自动提取与补全翻译

- 命令：`pnpm openI18n`
- 行为：
  - 扫描 `src`、`app` 下的 `.ts/.tsx/.mts`
  - 提取 `t('...')` 与 `app` 中 `definePageMeta()/metadata` 的 `title/description`
  - 根据 `src/types/locale.d.ts` 的 `Locale.Code` 生成/补全 `src/i18n/languages/*.json`
  - 仅补缺，不覆盖已有翻译；过滤包含 `.` 的非法键（`next-intl` 将 `.` 视为命名空间分隔符）
  - 非中文语言使用 Google 公共接口进行机器翻译，失败时回退原文；控制台仅输出统计信息

## 最佳实践

- key 使用可读中文，避免 `.` 字符（会被当作命名空间分隔符）
- 新增页面/文案后建议执行 `pnpm openI18n` 补齐语言包
- 客户端组件用 `useI18n`，服务端用 `generateMetadata/getMessages`
- 语言切换通过头部语言菜单完成（写入 `NEXT_LOCALE`，刷新生效）

## VSCode 片段约定

- `useT`：插入无 namespace 模板。
- `useTn`：插入有 namespace 模板。

## 为什么不使用“自动引入 t 函数”

- `t` 依赖 `useTranslations` 的上下文，必须在组件或自定义 Hook 中显式获取。
- 自动注入会弱化 Hook 规则边界，增加误用概率。
- 显式声明 `const { t } = useI18n(...)` 能让依赖来源和 namespace 一眼可见。
- 自动注入不利于调试与重构，跨模块时容易出现隐式耦合。

## 建议

- 客户端组件统一使用 `useI18n`。
- 服务端组件继续使用 `getTranslations`。
- 默认使用非严格模式，允许缺失 key 时不抛错。
- 对必须存在的关键文案可使用 `t(key, true)` 开启严格校验。
