import { definePageMeta } from '@/utils/meta';

// 使用我们刚刚封装的优雅方案，同时定义业务菜单数据和 Next.js 官方 SEO 数据
export const { pageMeta, metadata } = definePageMeta({
  title: '角色管理',
  icon: 'menus/blackCat',
  sort: 2, // 排序权重
  description: '系统角色与权限分配管理', // 这部分将作为 <meta name="description"> 输出
});

export default function RolePage() {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">{pageMeta.title}</h1>
      <div className="rounded-lg border border-slate-100 bg-white p-6 shadow-sm">
        <p className="text-slate-600">这里是角色管理页面的内容区域。</p>
        <p className="mt-2 text-sm text-slate-400">
          通过顶部的 pageMeta 导出，该页面会被自动收集到左侧菜单中。
        </p>
      </div>
    </div>
  );
}
