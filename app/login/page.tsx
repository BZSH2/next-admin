'use client';
import { useState } from 'react';

import { definePageMeta } from '@/utils/meta';

definePageMeta({
  title: '登录',
  hideInMenu: true,
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="w-full max-w-md">
        <div className="card p-8">
          <div className="mb-8 text-center">
            <h1 className="text-primary-600 text-2xl font-bold">Next Admin</h1>
            <p className="mt-2 text-sm text-zinc-500">请登录您的账户</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-zinc-700">
                邮箱
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="admin@example.com"
                className="input-base w-full"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-zinc-700">
                密码
              </label>
              <input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                className="input-base w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-zinc-300" />
                <span className="text-sm text-zinc-600">记住我</span>
              </label>
              <a href="#" className="text-primary-600 text-sm hover:underline">
                忘记密码？
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {isLoading ? '登录中...' : '登录'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500">
            还没有账户？{' '}
            <a href="#" className="text-primary-600 hover:underline">
              立即注册
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
