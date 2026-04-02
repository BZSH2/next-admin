import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// 引入全局类型声明文件以获取 PageMeta 和 MenuItem 的定义
/// <reference path="../../src/types/menu.d.ts" />

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class MenuGenerator {
  private static instance: MenuGenerator
  private readonly appDir: string
  private readonly outputFile: string

  private constructor() {
    this.appDir = path.join(__dirname, '../../app')
    this.outputFile = path.join(__dirname, '../../src/config/menu.ts')
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): MenuGenerator {
    if (!MenuGenerator.instance) {
      MenuGenerator.instance = new MenuGenerator()
    }
    return MenuGenerator.instance
  }

  /**
   * 核心执行方法：扫描、生成并写入文件
   */
  public execute() {
    // eslint-disable-next-line no-console
    console.log('🚀 开始扫描 app 目录生成菜单配置...')
    const menuTree = this.scanDirectory(this.appDir)
    this.writeToFile(menuTree)
    // eslint-disable-next-line no-console
    console.log(`✅ 菜单配置生成成功！已写入 ${path.relative(process.cwd(), this.outputFile)}`)
  }

  /**
   * 递归扫描目录，构建菜单树
   */
  private scanDirectory(dirPath: string, routePrefix: string = ''): MenuItem[] {
    const items: MenuItem[] = []

    if (!fs.existsSync(dirPath)) return items

    const files = fs.readdirSync(dirPath)

    for (const file of files) {
      const fullPath = path.join(dirPath, file)
      const stat = fs.statSync(fullPath)

      if (!stat.isDirectory()) continue

      // 忽略私有目录和 api 目录
      if (this.shouldIgnoreDirectory(file)) continue

      // 处理路由组：穿透扫描但不计入路径
      if (this.isRouteGroup(file)) {
        const groupChildren = this.scanDirectory(fullPath, routePrefix)
        items.push(...groupChildren)
        continue
      }

      const childRoute = `${routePrefix}/${file}`
      const meta = this.extractMetaFromDirectory(fullPath)
      const children = this.scanDirectory(fullPath, childRoute)

      // 仅当配置未设置隐藏，或者该目录下有合法的子菜单时，才将其加入菜单树
      if (this.shouldIncludeInMenu(meta, children)) {
        items.push({
          key: childRoute,
          title: meta?.title || file,
          sort: meta?.sort || 99,
          ...meta,
          children: children.length > 0 ? children : undefined,
        } as MenuItem)
      }
    }

    // 根据 sort 字段升序排序
    return items.sort((a, b) => (a.sort || 99) - (b.sort || 99))
  }

  /**
   * 判断是否应该忽略该目录
   */
  private shouldIgnoreDirectory(dirName: string): boolean {
    return dirName.startsWith('_') || dirName === 'api'
  }

  /**
   * 判断是否为路由组 (如: (main))
   */
  private isRouteGroup(dirName: string): boolean {
    return dirName.startsWith('(') && dirName.endsWith(')')
  }

  /**
   * 尝试从目录中的 page.tsx 提取 meta 配置
   */
  private extractMetaFromDirectory(dirPath: string): Partial<PageMeta> | null {
    const pagePath = path.join(dirPath, 'page.tsx')
    if (!fs.existsSync(pagePath)) return null

    const pageContent = fs.readFileSync(pagePath, 'utf-8')

    // 匹配 definePageMeta({ ... }) 里面的对象内容
    const match = pageContent.match(/definePageMeta\(\s*({[\s\S]*?})\s*\)/)
    if (!match) return null

    try {
      const objStr = match[1]
      // 使用 new Function 安全地计算出这个对象
      const getObj = new Function(`return ${objStr}`)
      return getObj() as Partial<PageMeta>
    } catch (error) {
      console.warn(`⚠️ 解析 ${pagePath} 的 pageMeta 失败:`, error)
      return null
    }
  }

  /**
   * 判断该节点是否应该被加入到菜单树中
   */
  private shouldIncludeInMenu(meta: Partial<PageMeta> | null, children: MenuItem[]): boolean {
    // 明确设置了隐藏
    if (meta?.hideInMenu === true) return false

    // 有 meta 配置，或者是包含子菜单的纯目录节点
    return meta !== null || children.length > 0
  }

  /**
   * 将菜单树序列化并写入目标文件
   */
  private writeToFile(menuTree: MenuItem[]) {
    const menuString = JSON.stringify(menuTree, null, 2)
    const fileContent = `// 此文件由 scripts/generateMenu/index.ts 自动生成
// 请勿手动修改！如需更改菜单，请在对应的 app 目录下修改 page.tsx 中的 definePageMeta。

export const menuConfig: MenuItem[] = ${menuString};
`

    fs.writeFileSync(this.outputFile, fileContent, 'utf-8')
  }
}

// 执行生成
MenuGenerator.getInstance().execute()
