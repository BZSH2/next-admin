import { languages } from '@/config/locale.config'
import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

/**
 * 服务端国际化请求配置：
 * - 只能使用 next/headers 的 cookies() 读取请求 Cookie
 * - 客户端 setCookie 使用 JSON 编码，这里需要做一次反序列化
 */
export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const rawLocaleCode = cookieStore.get('NEXT_LOCALE')?.value
  const localeCode = (() => {
    if (!rawLocaleCode) return undefined
    try {
      const parsed = JSON.parse(rawLocaleCode) as unknown
      return typeof parsed === 'string' ? parsed : undefined
    } catch {
      return rawLocaleCode
    }
  })()
  const locale =
    languages.find((item) => item.code === localeCode)?.code ?? languages[0]?.code ?? 'zh-CN'

  return {
    locale,
    messages: (await import(`./languages/${locale}.json`)).default,
  }
})
