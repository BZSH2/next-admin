'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: 'i-carbon-home',
  },
  {
    title: '系统管理',
    path: '/system',
    icon: 'i-carbon-settings',
  },
  {
    title: '用户管理',
    path: '/system/users',
    icon: 'i-carbon-user',
  },
  {
    title: '角色管理',
    path: '/system/roles',
    icon: 'i-carbon-group',
  },
  {
    title: '权限管理',
    path: '/system/permissions',
    icon: 'i-carbon-shield',
  },
  {
    title: '系统设置',
    path: '/system/settings',
    icon: 'i-carbon-settings',
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed top-0 left-0 z-30 h-full w-64 transform bg-white transition-transform duration-300 lg:static lg:translate-x-0 dark:bg-zinc-900 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center border-b border-zinc-200 px-6 dark:border-zinc-700">
          <h1 className="text-primary-600 text-xl font-bold">Next Admin</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20'
                        : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'
                    }`}
                    onClick={onClose}
                  >
                    <span className={`${item.icon} text-lg`} />
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export function Header() {
  const [isDark, setIsDark] = useState(false);

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-6 dark:border-zinc-700 dark:bg-zinc-900">
      <button className="lg:hidden" type="button">
        <span className="i-carbon-menu text-2xl" />
      </button>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggleDark}
          className="rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <span className={`${isDark ? 'i-carbon-moon' : 'i-carbon-sun'} text-xl`} />
        </button>
        <div className="flex items-center gap-2">
          <div className="bg-primary-600 flex h-8 w-8 items-center justify-center rounded-full font-medium text-white">
            A
          </div>
          <span className="hidden text-sm font-medium text-zinc-700 sm:block dark:text-zinc-300">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
}
