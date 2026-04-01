/**
 * 全局菜单项配置接口
 * 结合了业务的 PageMeta 和树形结构所需的 key 与 children
 */
declare interface MenuItem extends PageMeta {
  key: string;
  children?: MenuItem[];
}
