import { definePageMeta } from '@/utils/meta';

export const { pageMeta, metadata } = definePageMeta({
  title: '用户管理',
  icon: 'menus/hey',
  sort: 1,
  description: '系统账号与用户信息管理',
});

export default function UserPage() {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">{pageMeta.title}</h1>
      <div className="rounded-lg border border-slate-100 bg-white p-6 shadow-sm">
        <p className="text-slate-600">这里是用户管理页面的内容区域。</p>
        <p className="mt-2 text-sm text-slate-400">
          通过顶部的 pageMeta 导出，该页面会被自动收集到左侧菜单中。
        </p>
      </div>
    </div>
  );
}
