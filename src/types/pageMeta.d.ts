import type { Metadata } from 'next';

/**
 * 自定义页面元数据接口
 * 声明为全局类型，无需在代码中 import 即可直接使用 `PageMeta`
 * 继承自 Next.js 官方的 Metadata，既能支持 SEO 配置，也能支持业务的菜单生成。
 */
declare global {
  interface PageMeta extends Metadata {
    /**
     * 页面/菜单标题
     * (覆盖官方的可选 title，在我们的业务中它是必填的，且强制为字符串)
     * @example '工作台', '用户管理'
     */
    title: string;

    /**
     * Ant Design 图标组件的名称字符串
     * 脚本会自动将其转换为对应的 React 节点 (<DashboardOutlined />)
     * @example 'DashboardOutlined', 'UserOutlined'
     */
    icon?: string;

    /**
     * 菜单排序权重
     * 数字越小，在同级菜单中越靠前。默认值通常约定为 99。
     * @example 1, 2, 10
     */
    sort?: number;

    /**
     * 是否在左侧菜单栏中隐藏该路由
     * 适用于详情页、编辑页等不需要在菜单中展示，但需要加入路由树的页面。
     * @default false
     */
    hideInMenu?: boolean;

    /**
     * 是否在面包屑导航中隐藏该路由
     * @default false
     */
    hideInBreadcrumb?: boolean;

    /**
     * 重定向地址
     * 当点击父级菜单（如包含子菜单的目录）时，期望跳转的默认子路径。
     * @example '/system/users'
     */
    redirect?: string;

    /**
     * 权限标识符列表
     * 用于前端按钮级别或页面级别的细粒度权限控制 (RBAC)。
     * @example ['system:user:read', 'system:user:edit']
     */
    permissions?: string[];

    /**
     * 路由激活高亮规则
     * 当处于某些隐藏的子路由（如 /users/detail）时，希望左侧菜单依然高亮某个父级菜单。
     * @example '/system/users'
     */
    activeMenu?: string;
  }
}
