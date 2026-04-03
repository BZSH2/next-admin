import { settingConfig } from '@/config/setting.config'

/**
 * 类型安全的浏览器存储工具（LocalStorage / SessionStorage）
 *
 * 特性：
 * - SSR 安全：在非浏览器环境下自动短路返回
 * - 类型安全：键和值来自 Storage.Schema 的 Key / Value 推导
 * - 统一 API：通过第三个参数选择使用 'local' 或 'session'
 *
 * 示例：
 * setStorage('theme', 'dark', 'local')
 * getStorage('collapsed', 'session') // boolean | null
 * removeStorage('theme', 'local')
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

/**
 * 为键名添加可选命名空间前缀
 */
const namespaced = (key: string) => `${PREFIX}${key}`

/**
 * 根据类型获取具体存储容器
 */
const getStore = (type: Storage.type): Storage | undefined =>
  isBrowser ? (type === 'local' ? window.localStorage : window.sessionStorage) : undefined

/**
 * 写入存储
 * @param key Storage.Key（由 Storage.Schema 推导）
 * @param value 与 key 对应的值类型（由 Storage.Value 推导）
 * @param place 'local' | 'session'，默认 'local'
 * @returns 写入是否成功
 */
export const setStorage = <K extends Storage.Key>(
  key: K,
  value: Storage.Value<K>,
  place: Storage.type = 'local'
) => {
  const store = getStore(place)
  if (!store) return false
  try {
    store.setItem(namespaced(String(key)), encode(value))
    return true
  } catch {
    return false
  }
}

/**
 * 读取存储
 * @param key Storage.Key（由 Storage.Schema 推导）
 * @param place 'local' | 'session'，默认 'local'
 * @returns 对应的值或 null
 */
export const getStorage = <K extends Storage.Key>(
  key: K,
  place: Storage.type = 'local'
): Storage.Value<K> | null => {
  const store = getStore(place)
  if (!store) return null
  return decode<Storage.Value<K>>(store.getItem(namespaced(String(key))))
}

/**
 * 移除存储
 * @param key Storage.Key（由 Storage.Schema 推导）
 * @param place 'local' | 'session'，默认 'local'
 * @returns 移除是否成功
 */
export const removeStorage = <K extends Storage.Key>(key: K, place: Storage.type = 'local') => {
  const store = getStore(place)
  if (!store) return false
  try {
    store.removeItem(namespaced(String(key)))
    return true
  } catch {
    return false
  }
}
