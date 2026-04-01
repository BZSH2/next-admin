'use client';

import { useCallback } from 'react';
import Sidebar from './components/Sidebar/index';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCollapsed } from '@/store/slices/uiSlice';
import MainHeader from './components/MainHeader';

export default function Layouts({ children }: { children: React.ReactNode }) {
  const collapsed = useAppSelector((s) => s.ui.collapsed);
  const dispatch = useAppDispatch();
  const onSetCollapsed = useCallback((v: boolean) => dispatch(setCollapsed(v)), [dispatch]);

  // 在 Next.js App Router 中，最优雅且支持 Server Component 的“单文件”样式方案
  // 就是使用 Utility Classes (如你项目中已安装的 UnoCSS/Tailwind)
  return (
    <div className="flex min-h-screen w-full bg-slate-50 text-slate-900">
      <Sidebar collapsed={collapsed} setCollapsed={onSetCollapsed} />
      <main className="relative flex h-screen flex-1 flex-col overflow-hidden">
        <MainHeader />

        <div className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="min-h-full rounded-lg border border-slate-100 bg-white p-6 shadow-sm">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
