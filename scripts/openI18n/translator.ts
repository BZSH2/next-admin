/**
 * 生成翻译服务使用的目标语言代码：
 * - 中文保留地区（如 zh-CN）
 * - 其他语言统一降级为语种（如 pt-BR -> pt）
 */
export const toTranslateLocale = (code: string) => {
  const [lang, region] = code.split('-')
  if (!lang) return 'en'
  if (lang.toLowerCase() === 'zh' && region) return `zh-${region.toUpperCase()}`
  return lang.toLowerCase()
}

/**
 * 判断 locale 是否为中文语种，用于中文包直接回填原文
 */
export const isChineseLocale = (code: string) => code.split('-')[0]?.toLowerCase() === 'zh'

/**
 * 调用 Google 公共接口进行机器翻译。
 * 请求失败、响应异常或解析失败时回退原文，保证脚本可持续执行。
 */
export const translateText = async (text: string, target: string) => {
  const query = new URLSearchParams({
    client: 'gtx',
    sl: 'auto',
    tl: target,
    dt: 't',
    q: text,
  }).toString()
  const url = `https://translate.googleapis.com/translate_a/single?${query}`
  try {
    const res = await fetch(url)
    if (!res.ok) return text
    const data = (await res.json()) as unknown
    if (!Array.isArray(data)) return text
    const sentences = data[0]
    if (!Array.isArray(sentences)) return text
    const translated = sentences
      .map((item) => (Array.isArray(item) ? item[0] : ''))
      .filter((part): part is string => typeof part === 'string')
      .join('')
      .trim()
    return translated || text
  } catch {
    return text
  }
}
