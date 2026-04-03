import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '../..')

/**
 * openI18n 执行流程
 * 1) 扫描 src / app 下的源码文件，提取待翻译文本
 * 2) 提取来源：
 *    - t('...') / t("...") / t(`...`) 的首个字面量参数
 *    - app 下 definePageMeta(...) 与 metadata 导出的 title / description
 * 3) 读取 src/types/locale.d.ts 的 Locale.Code，映射为语言包文件名
 * 4) 补齐 src/i18n/languages/*.json 中缺失键并自动翻译
 * 5) 清理 next-intl 非法键（包含 '.'），并输出统计信息
 *
 * 约束：
 * - 仅补齐缺失键，不覆盖已有翻译
 * - 控制台不输出具体翻译内容，避免噪音与乱码
 */
class OpenI18n {
  private roots: string[]
  private appRoot = path.join(projectRoot, 'app')
  private localeTypePath = path.join(projectRoot, 'src', 'types', 'locale.d.ts')
  private localeDir = path.join(projectRoot, 'src', 'i18n', 'languages')
  private ignore = new Set(['node_modules', '.next', '.git', 'dist', 'coverage'])
  private exts = /\.(ts|tsx|mts)$/
  /**
   * 轻量匹配策略：正则提取，不做 AST 解析
   * 目标是快速提取稳定的字面量文本，降低脚本复杂度
   */
  private tCall = /\bt\s*\(\s*(['"`])((?:\\.|(?!\1)[\s\S])*)\1/g
  private definePageMetaCall = /definePageMeta\(\s*({[\s\S]*?})\s*\)/g
  private metadataExport = /export\s+const\s+metadata(?:\s*:\s*Metadata)?\s*=\s*({[\s\S]*?})/g

  constructor(roots?: string[]) {
    this.roots =
      roots && roots.length ? roots : [path.join(projectRoot, 'src'), path.join(projectRoot, 'app')]
  }

  /**
   * 时间复杂度说明：
   * - 扫描目录：O(F)
   * - 读取与匹配：O(T)
   * - 排序去重：O(K log K)
   * 其中 F=文件数，T=总字符数，K=去重后 key 数
   */
  async run() {
    const files = this.collectFiles()
    const keys = new Set<string>()
    for (const file of files) {
      for (const k of this.extract(file)) keys.add(k)
    }
    const list = Array.from(keys).sort((a, b) => a.localeCompare(b))
    const stats = await this.syncLocales(list)
    const lines = [
      'openI18n completed',
      `- scanned files: ${files.length}`,
      `- extracted keys: ${list.length}`,
      `- locales updated: ${stats.localesUpdated}`,
      `- new keys added: ${stats.totalAdded}`,
      `- invalid keys cleaned: ${stats.totalCleaned}`,
    ]
    process.stdout.write(`${lines.join('\n')}\n`)
  }

  private collectFiles() {
    const all: string[] = []
    for (const root of this.roots) this.walk(root, all)
    return all
  }

  /**
   * 递归遍历目录，按扩展名筛选候选文件
   */
  private walk(dir: string, out: string[]) {
    if (!fs.existsSync(dir)) return
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const e of entries) {
      const p = path.join(dir, e.name)
      if (e.isDirectory()) {
        if (!this.ignore.has(e.name)) this.walk(p, out)
        continue
      }
      if (this.exts.test(e.name)) out.push(p)
    }
  }

  /**
   * 从单文件中提取 t() 的字面量 key
   */
  private extract(file: string) {
    const content = fs.readFileSync(file, 'utf-8')
    const list: string[] = []
    for (const m of content.matchAll(this.tCall)) {
      const key = m[2]
      if (key) list.push(key)
    }
    if (file.startsWith(this.appRoot)) {
      for (const m of content.matchAll(this.definePageMetaCall)) {
        const obj = m[1]
        if (!obj) continue
        const title = this.extractMetaField(obj, 'title')
        if (title) list.push(title)
        const description = this.extractMetaField(obj, 'description')
        if (description) list.push(description)
      }
      for (const m of content.matchAll(this.metadataExport)) {
        const obj = m[1]
        if (!obj) continue
        const title = this.extractMetaField(obj, 'title')
        if (title) list.push(title)
        const description = this.extractMetaField(obj, 'description')
        if (description) list.push(description)
      }
    }
    return list
  }

  private extractMetaField(input: string, field: 'title' | 'description') {
    const reg = new RegExp(`\\b${field}\\s*:\\s*(['"\`])((?:\\\\.|(?!\\1)[\\s\\S])*?)\\1`)
    const match = input.match(reg)
    return match?.[2]
  }

  /**
   * 从 locale.d.ts 的 Locale.Code 联合类型中提取语言代码
   * 未命中时回退到 ['zh-CN', 'en-US']
   */
  private readLocaleCodes() {
    if (!fs.existsSync(this.localeTypePath)) return ['zh-CN', 'en-US']
    const content = fs.readFileSync(this.localeTypePath, 'utf-8')
    const codeBlockMatch = content.match(
      /type\s+Code\s*=\s*([\s\S]*?)(?:\n\s*\n|\n\s*\/\*\*|\n\s*interface)/
    )
    if (!codeBlockMatch?.[1]) return ['zh-CN', 'en-US']
    const block = codeBlockMatch[1]
    const matches = Array.from(block.matchAll(/'([^']+)'/g))
    const codes = matches.map((m) => m[1]).filter(Boolean) as string[]
    return codes.length ? codes : ['zh-CN', 'en-US']
  }

  /**
   * 语言文件名映射：zh-CN -> zh, en-US -> en
   */
  private toFileLocale(code: string) {
    return code.split('-')[0]?.toLowerCase() || code.toLowerCase()
  }

  /**
   * 翻译服务目标语言映射：优先保留语种，中文保留地区
   * 例如：zh-CN -> zh-CN, pt-BR -> pt
   */
  private toTranslateLocale(code: string) {
    const [lang, region] = code.split('-')
    if (!lang) return 'en'
    if (lang.toLowerCase() === 'zh' && region) return `zh-${region.toUpperCase()}`
    return lang.toLowerCase()
  }

  private readLocaleJson(filePath: string) {
    if (!fs.existsSync(filePath)) return {} as Record<string, string>
    const content = fs.readFileSync(filePath, 'utf-8')
    if (!content.trim()) return {} as Record<string, string>
    return JSON.parse(content) as Record<string, string>
  }

  /**
   * next-intl 约束：key 不能包含 '.'
   * 该字符会被解释为命名空间路径分隔符
   */
  private isValidMessageKey(key: string) {
    return !key.includes('.')
  }

  /**
   * 同步语言包：
   * - 过滤非法键
   * - 清理历史非法键
   * - 为缺失键填充翻译
   * - 返回统计结果用于 CLI 输出
   */
  private async syncLocales(keys: string[]) {
    fs.mkdirSync(this.localeDir, { recursive: true })
    const validKeys = keys.filter((key) => this.isValidMessageKey(key))
    const codes = this.readLocaleCodes()
    const localeMap = new Map<string, { code: string; translate: string }>()
    for (const code of codes) {
      const fileLocale = this.toFileLocale(code)
      if (!localeMap.has(fileLocale)) {
        localeMap.set(fileLocale, {
          code: fileLocale,
          translate: this.toTranslateLocale(code),
        })
      }
    }

    let localesUpdated = 0
    let totalAdded = 0
    let totalCleaned = 0

    for (const locale of localeMap.values()) {
      const localePath = path.join(this.localeDir, `${locale.code}.json`)
      const loaded = this.readLocaleJson(localePath)
      const current = Object.fromEntries(
        Object.entries(loaded).filter(([key]) => this.isValidMessageKey(key))
      )
      let changed = false
      if (Object.keys(loaded).length !== Object.keys(current).length) {
        changed = true
        totalCleaned += Object.keys(loaded).length - Object.keys(current).length
      }
      for (const key of validKeys) {
        if (current[key] !== undefined) continue
        if (locale.code === 'zh') {
          current[key] = key
        } else {
          current[key] = await this.translateText(key, locale.translate)
        }
        changed = true
        totalAdded += 1
      }
      if (changed) {
        const sorted = Object.fromEntries(
          Object.entries(current).sort(([a], [b]) => a.localeCompare(b, 'zh-Hans-CN'))
        )
        fs.writeFileSync(localePath, `${JSON.stringify(sorted, null, 2)}\n`, 'utf-8')
        localesUpdated += 1
      }
    }
    return { localesUpdated, totalAdded, totalCleaned }
  }

  /**
   * 使用 Google 公共接口进行机器翻译
   * 网络异常或响应异常时回退原文，保证脚本可持续执行
   */
  private async translateText(text: string, target: string) {
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
}

new OpenI18n().run()
