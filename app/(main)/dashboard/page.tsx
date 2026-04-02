import { definePageMeta } from '@/utils/meta'
import Icon from '@/Icon'

export const { pageMeta, metadata } = definePageMeta({
  title: '工作台',
  icon: 'menus/goldenRetriever',
  sort: 1,
  description: '系统数据大盘与快捷操作',
})

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">{pageMeta.title}</h1>
      <div className="rounded-lg border border-slate-100 bg-white p-6 shadow-sm">
        <p className="text-slate-600">欢迎来到 Next Admin 工作台。</p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-2 text-slate-700">
          <Icon iconName="layout-collapsed" size={18} />
          <span className="text-sm">collapsed.svg 示例</span>
        </div>
      </div>
    </div>
  )
}
