import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { pinyin } from 'pinyin-pro'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
class RenameSvg {
  private static instance: RenameSvg
  private readonly svgDir: string

  private constructor() {
    this.svgDir = path.join(__dirname, '../../src/Icon/svg')
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): RenameSvg {
    if (!RenameSvg.instance) {
      RenameSvg.instance = new RenameSvg()
    }
    return RenameSvg.instance
  }

  /**
   * 执行入口：扫描 SVG、生成重命名计划并落盘
   */
  public execute() {
    this.log('🚀 开始扫描 SVG 图标文件...')

    const svgFiles = this.collectSvgFiles(this.svgDir)
    const plans = this.buildRenamePlans(svgFiles)

    if (plans.length === 0) {
      this.log('✅ 所有 SVG 文件已是小驼峰格式，无需重命名。')
      return
    }

    this.ensureNoDuplicateTargets(plans)
    this.renameWithTempNames(plans)

    this.log(`✅ 重命名完成，共处理 ${plans.length} 个 SVG 文件。`)
  }

  /**
   * 递归收集目录中的全部 SVG 文件
   */
  private collectSvgFiles(dir: string): string[] {
    if (!fs.existsSync(dir)) return []

    const entries = fs.readdirSync(dir, { withFileTypes: true })
    const files: string[] = []

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        files.push(...this.collectSvgFiles(fullPath))
        continue
      }
      if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.svg') {
        files.push(fullPath)
      }
    }

    return files
  }

  /**
   * 基于当前文件名构建重命名计划
   */
  private buildRenamePlans(svgFiles: string[]) {
    const plans: Array<{ from: string; temp: string; to: string }> = []

    for (const filePath of svgFiles) {
      const dir = path.dirname(filePath)
      const ext = path.extname(filePath)
      const baseName = path.basename(filePath, ext)
      const nextBaseName = this.toLowerCamel(baseName)

      if (nextBaseName === baseName) continue

      const to = path.join(dir, `${nextBaseName}${ext}`)
      const temp = path.join(dir, `${baseName}.__renameSvg_tmp__${ext}`)
      plans.push({ from: filePath, temp, to })
    }

    return plans
  }

  /**
   * 将任意文件名片段转换为小驼峰
   */
  private toLowerCamel(name: string): string {
    const baseParts = name
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/[_\-\s]+/g, ' ')
      .trim()
      .split(/\s+/)
      .filter(Boolean)

    const parts = baseParts.flatMap((part) => this.expandToAsciiParts(part))
    if (parts.length === 0) return name

    const first = parts[0]
    if (!first) return name
    const rest = parts.slice(1)
    const firstPart = first.charAt(0).toLowerCase() + first.slice(1)
    const restPart = rest.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join('')

    const finalName = `${firstPart}${restPart}`
    if (/^[0-9]/.test(finalName)) {
      return `icon${finalName.charAt(0).toUpperCase()}${finalName.slice(1)}`
    }
    return finalName
  }

  /**
   * 将非 ASCII 内容扩展为可参与命名的 ASCII 片段
   */
  private expandToAsciiParts(part: string): string[] {
    const parts: string[] = []
    let current = ''

    for (const char of part) {
      if (/[a-zA-Z0-9]/.test(char)) {
        current += char
        continue
      }

      if (current) {
        parts.push(current)
        current = ''
      }

      if (this.isHan(char)) {
        parts.push(this.hanToPinyin(char))
      }
    }

    if (current) {
      parts.push(current)
    }

    return parts
  }

  /**
   * 判断字符是否为汉字
   */
  private isHan(char: string): boolean {
    return /\p{Script=Han}/u.test(char)
  }

  /**
   * 将汉字转换为拼音；若转换失败则回退为 unicode 标记
   */
  private hanToPinyin(text: string): string {
    const normalized = pinyin(text, {
      toneType: 'none',
      type: 'array',
      v: true,
      nonZh: 'removed',
    })
      .map((item) => item.toLowerCase())
      .join('')

    if (normalized) {
      return normalized
    }

    const code = text.codePointAt(0)
    if (!code) return 'u0'
    return `u${code.toString(16)}`
  }

  /**
   * 校验目标文件名是否冲突，避免覆盖已有图标
   */
  private ensureNoDuplicateTargets(plans: Array<{ from: string; temp: string; to: string }>) {
    const duplicateMap = new Map<string, string[]>()

    for (const plan of plans) {
      const key = plan.to.toLowerCase()
      const exists = duplicateMap.get(key) ?? []
      exists.push(plan.from)
      duplicateMap.set(key, exists)
    }

    for (const [to, fromList] of duplicateMap) {
      if (fromList.length > 1) {
        throw new Error(`检测到重名冲突：${fromList.join(', ')} -> ${to}`)
      }
    }
  }

  /**
   * 两阶段重命名，规避大小写不敏感文件系统的冲突问题
   */
  private renameWithTempNames(plans: Array<{ from: string; temp: string; to: string }>) {
    for (const plan of plans) {
      fs.renameSync(plan.from, plan.temp)
    }
    for (const plan of plans) {
      fs.renameSync(plan.temp, plan.to)
    }
  }

  private log(message: string) {
    process.stdout.write(`${message}\n`)
  }
}

RenameSvg.getInstance().execute()
