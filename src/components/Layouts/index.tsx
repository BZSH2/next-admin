'use client';

import Sidebar from './components/Sidebar/index';
import MainHeader from './components/MainHeader';
import { useLayoutModeInitializer } from './hooks/useLayoutMode';

export default function Layouts({ children }: { children: React.ReactNode }) {
  useLayoutModeInitializer();

  // 在 Next.js App Router 中，最优雅且支持 Server Component 的“单文件”样式方案
  // 就是使用 Utility Classes (如你项目中已安装的 UnoCSS/Tailwind)
  return (
    <div className="flex min-h-screen w-full bg-slate-100 text-slate-900">
      <Sidebar />
      <main className="relative flex h-screen flex-1 flex-col overflow-hidden">
        <MainHeader />

        <div className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <div className="min-h-full rounded-md border border-slate-200 bg-white p-4">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
