/**
 * 全局菜单项配置接口
 * 结合了业务的 PageMeta 和树形结构所需的 key 与 children
 */
declare interface MenuItem extends PageMeta {
  /**
   * 路由的唯一标识 (通常是 URL 路径)
   * @example '/dashboard'
   */
  key: string;

  /**
   * 子菜单项列表
   */
  children?: MenuItem[];
}
