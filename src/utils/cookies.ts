import { settingConfig } from '@/config/setting.config'
import Cookies from 'js-cookie'

/**
 * 类型安全的 Cookie 工具
 *
 * 特性：
 * - SSR 安全：在非浏览器环境下自动短路返回
 * - 类型安全：键和值来自 Cookie.Schema 的 Key / Value 推导
 * - 统一序列化：统一用 JSON 编解码，支持对象和基础类型
 */
const PREFIX = settingConfig.cacheKeyPrefix
const isBrowser = typeof window !== 'undefined'

/**
 * 将任意值编码为字符串（统一 JSON 存储）
 */
const encode = (value: unknown) => JSON.stringify(value)

/**
 * 将字符串安全解码为指定类型
 */
const decode = <T>(raw: string | null): T | null => {
  if (raw == null) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

const namespaced = (key: string) => `${PREFIX}${key}`

const normalizeOptions = (options: Cookie.Attributes = {}): Cookies.CookieAttributes => {
  const { maxAge, ...rest } = options
  if (typeof maxAge !== 'number') return rest
  return {
    ...rest,
    expires: maxAge / 60 / 60 / 24,
  }
}

/**
 * 写入 Cookie
 * @param key Cookie.Key（由 Cookie.Schema 推导）
 * @param value 与 key 对应的值类型（由 Cookie.Value 推导）
 * @param options Cookie 属性
 * @returns 写入是否成功
 */
export const setCookie = <K extends Cookie.Key>(
  key: K,
  value: Cookie.Value<K>,
  options: Cookie.Attributes = {}
) => {
  if (!isBrowser) return false
  try {
    Cookies.set(namespaced(String(key)), encode(value), normalizeOptions(options))
    return true
  } catch {
    return false
  }
}

/**
 * 读取 Cookie
 * @param key Cookie.Key（由 Cookie.Schema 推导）
 * @returns 对应值或 null
 */
export const getCookie = <K extends Cookie.Key>(key: K): Cookie.Value<K> | null => {
  if (!isBrowser) return null

  return decode<Cookie.Value<K>>(Cookies.get(namespaced(String(key))) ?? null)
}

/**
 * 删除 Cookie
 * @param key Cookie.Key（由 Cookie.Schema 推导）
 * @param options 与 setCookie 一致，可用于指定 path / domain
 * @returns 删除是否成功
 */
export const removeCookie = <K extends Cookie.Key>(key: K, options: Cookie.Attributes = {}) =>
  (() => {
    if (!isBrowser) return false
    try {
      Cookies.remove(namespaced(String(key)), normalizeOptions(options))
      return true
    } catch {
      return false
    }
  })()
