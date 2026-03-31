import { definePageMeta } from '@/utils/meta';

export const { pageMeta, metadata } = definePageMeta({
  title: '工作台',
  icon: 'DashboardOutlined',
  sort: 1,
  description: '系统数据大盘与快捷操作',
});

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">{pageMeta.title}</h1>
      <div className="rounded-lg border border-slate-100 bg-white p-6 shadow-sm">
        <p className="text-slate-600">欢迎来到 Next Admin 工作台。</p>
      </div>
    </div>
  );
}
