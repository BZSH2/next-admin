# 客户端持久化内核（Storage/Cookies）

## 目标

- 统一客户端持久化能力，提供类型安全的 `storage` 与 `cookies` 工具。
- 用配置统一管理键名前缀，避免散落常量。
- 对上层业务提供稳定 API，降低状态持久化接入成本。

## 涉及文件

- `src/config/setting.config.ts`
- `src/types/storage.d.ts`
- `src/types/cookie.d.ts`
- `src/utils/storage.ts`
- `src/utils/cookies.ts`

## 全局配置

`settingConfig.cacheKeyPrefix` 用于统一控制客户端持久化键名前缀：

```ts
export const settingConfig = {
  cacheKeyPrefix: '',
}
```

`storage` 与 `cookies` 都通过该配置拼接最终 key，后续如果需要多环境隔离（如 `admin_`、`prod_`），只需改这一处。

## Storage 封装

位置：`src/utils/storage.ts`

### 特性

- SSR 安全：非浏览器环境直接短路。
- 类型安全：键和值由 `Storage.Schema` 推导。
- 统一序列化：使用 `JSON.stringify / JSON.parse`。
- 双容器支持：`localStorage` / `sessionStorage`。

### API

- `setStorage(key, value, place?) => boolean`
- `getStorage(key, place?) => value | null`
- `removeStorage(key, place?) => boolean`

其中 `place` 为 `'local' | 'session'`，默认 `'local'`。

## Cookie 封装（插件方案）

位置：`src/utils/cookies.ts`

### 依赖

- 运行时：`js-cookie`
- 类型：`@types/js-cookie`

### 类型模型

位置：`src/types/cookie.d.ts`

- `Cookie.Schema`：当前声明了 `NEXT_LOCALE`
- `Cookie.Key` / `Cookie.Value`：从 Schema 推导
- `Cookie.Attributes`：封装 path/domain/expires/maxAge/secure/sameSite

### 设计要点

- 使用 `js-cookie` 读写，避免直接操作原生 `document.cookie`。
- 与 storage 一致，值统一走 JSON 编解码。
- `maxAge` 以秒为单位输入，内部转换为 `js-cookie` 的 `expires`（天）。
- 删除 cookie 时复用同一套 options 归一化逻辑，保证 path/domain 一致时可正确删除。

### API

- `setCookie(key, value, options?) => boolean`
- `getCookie(key) => value | null`
- `removeCookie(key, options?) => boolean`

## 与国际化体系的关系

- 当前仅负责提供 `NEXT_LOCALE` 的 cookie 读写能力。
- 语言解析、服务端加载、菜单选中态同步已拆分到国际化专项文档。
- 详见：`docs/i18n-useI18n.md`

## 使用示例

```ts
import { getCookie, setCookie, setStorage } from '@/utils'

setStorage('theme', 'dark', 'local')
setCookie('NEXT_LOCALE', 'en', { path: '/', maxAge: 60 * 60 * 24 * 365 })

const locale = getCookie('NEXT_LOCALE')
```

## 扩展建议

- 新增 Cookie 项时，只需要扩展 `Cookie.Schema`。
- 如果后续需要多租户隔离，优先通过 `cacheKeyPrefix` 控制 key 命名空间。
