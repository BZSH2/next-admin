'use client'

import { useCallback } from 'react'
import { useTranslations } from 'next-intl'

/**
 * useI18n 可选配置
 * - namespace: next-intl 命名空间，传入后等价于 useTranslations(namespace)
 */
interface UseI18nOptions {
  namespace?: Parameters<typeof useTranslations>[0]
}

/**
 * 统一的国际化 Hook
 *
 * 使用建议：
 * - 无命名空间：const { t } = useI18n()
 * - 有命名空间：const { t } = useI18n({ namespace: 'common' })
 *
 * 设计约束：
 * - 不采用“自动注入全局 t 函数”的方式，始终在组件/Hook 内显式获取 t。
 * - 这样可以保证 Hook 调用规则稳定、依赖来源清晰、命名空间上下文明确，并避免跨组件共享状态导致的不可预期行为。
 *
 * 返回值说明：
 * - t(key, strict?): 安全翻译函数。默认 key 不存在时返回空字符串；当 strict 为 true 时抛出错误。
 * - rawT: next-intl 原始翻译函数，保留完整能力（如富文本、原始 API）。
 * - has: 判断某个 key 在当前 locale + namespace 下是否存在。
 */
export function useI18n(options?: UseI18nOptions) {
  const rawT = useTranslations(options?.namespace)

  const t = useCallback(
    (key: string, strict = false) => {
      if (rawT.has(key)) {
        return rawT(key)
      }
      if (strict) {
        throw new Error(`[useI18n] MISSING_MESSAGE: ${key}`)
      }
      return ''
    },
    [rawT]
  )

  return {
    t,
    rawT,
    has: rawT.has,
  }
}
