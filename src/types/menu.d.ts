import type { Metadata } from 'next'

declare global {
  /**
   * 页面元信息
   *
   * - 继承 Next.js 官方 Metadata，既可用于 SEO/head，也可作为业务菜单数据来源
   * - 在页面中通过 definePageMeta 返回的 pageMeta 导出
   * - 由脚本扫描生成菜单（src/config/menu.ts）
   */
  interface PageMeta extends Metadata {
    /**
     * 页面/菜单标题（必填）
     * @example '工作台' | '用户管理'
     */
    title: string
    /**
     * 菜单图标标识
     * - 推荐使用项目内 SVG 名称（见 src/Icon/svg），如 'menus/hello'
     * - 也可以留空，渲染时会有默认图标
     * @example 'menus/hello'
     */
    icon?: string
    /**
     * 菜单排序权重（数字越小越靠前）
     * @default 99
     * @example 1
     */
    sort?: number
    /**
     * 是否在侧边菜单隐藏该页面
     * 适用于详情页、编辑页等
     * @default false
     */
    hideInMenu?: boolean
    /**
     * 是否在面包屑隐藏该页面
     * @default false
     */
    hideInBreadcrumb?: boolean
    /**
     * 点击父级菜单时的默认跳转路径
     * @example '/system/user'
     */
    redirect?: string
    /**
     * 权限标识列表（RBAC）
     * @example ['system:user:read', 'system:user:edit']
     */
    permissions?: string[]
    /**
     * 路由激活高亮规则
     * 用于隐藏子路由时仍让某个父级菜单保持高亮
     * @example '/system/user'
     */
    activeMenu?: string
  }

  /**
   * 菜单项
   * - 在 PageMeta 的基础上，补充树结构所需的 key 与 children
   */
  interface MenuItem extends PageMeta {
    /**
     * 路由唯一标识（通常为路径）
     * @example '/dashboard'
     */
    key: string
    /**
     * 子菜单
     */
    children?: MenuItem[]
  }
}
