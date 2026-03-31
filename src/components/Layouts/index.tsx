'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar/index';

export default function Layouts({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  // 在 Next.js App Router 中，最优雅且支持 Server Component 的“单文件”样式方案
  // 就是使用 Utility Classes (如你项目中已安装的 UnoCSS/Tailwind)
  return (
    <div className="flex min-h-screen w-full bg-slate-50 text-slate-900">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className="flex flex-1 flex-col overflow-hidden">
        <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="text-lg font-bold">Admin Header</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-slate-200" />
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="min-h-full rounded-lg border border-slate-100 bg-white p-6 shadow-sm">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
