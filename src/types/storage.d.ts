import type { LocaleCode } from '@/config/locale.config'

/**
 * 应用级存储类型声明
 *
 * 通过扩展命名空间 Storage，提供一套与浏览器 Storage 接口区分开的
 * 类型安全键值模型。注意：这里的 Storage 是类型命名空间，不是 DOM 的 Storage 接口实例。
 */
declare global {
  namespace Storage {
    /**
     * 存储 Schema：集中声明允许的键与值类型
     */
    interface Schema {
      /** 主题模式 */
      theme: 'light' | 'dark' | 'system'
      /** 国际化语言 */
      locale: LocaleCode
    }

    /** 所有合法键名 */
    type Key = keyof Schema
    /** 根据键名推导对应值类型 */
    type Value<K extends Key = Key> = Schema[K]
    /** 键值条目工具类型 */
    type Entry<K extends Key = Key> = {
      key: K
      value: Value<K>
    }
    /** 存储类型 */
    type type = 'local' | 'session'
  }
}

export {}
