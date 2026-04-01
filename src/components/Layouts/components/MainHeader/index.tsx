'use client';

import PageTabs from './components/PageTabs';

export default function MainHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-16 w-full shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm">
      <div className="flex min-w-0 flex-1 pr-4">
        <PageTabs />
      </div>
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 rounded-full bg-slate-200" />
      </div>
    </header>
  );
}
