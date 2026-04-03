import { definePageMeta } from '@/utils/meta'

// 对于像 /system 这样的纯目录路由（点击后应该展开子菜单或重定向到子页面）
// 我们通过 redirect 字段告诉系统它的默认跳转行为，同时设定它在菜单里的父级名称和图标
export const { pageMeta, metadata, generateMetadata } = definePageMeta({
  title: '系统管理',
  icon: 'menus/borderCollie',
  sort: 99,
  redirect: '/system/user', // 约定：点击系统管理时，默认重定向到用户管理
})

export default function SystemPage() {
  // 如果你在 layout 或者中间件里处理了 redirect，这个页面组件可能永远不会被渲染
  // 但我们还是保留一个友好的提示
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">{pageMeta.title}</h1>
      <p className="text-slate-600">请选择左侧的子菜单进行操作。</p>
    </div>
  )
}
