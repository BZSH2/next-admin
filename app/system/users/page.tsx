'use client';

import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    role: '管理员',
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    role: '编辑',
    status: 'active',
    createdAt: '2024-02-20',
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    role: '用户',
    status: 'inactive',
    createdAt: '2024-03-10',
  },
  {
    id: 4,
    name: '赵六',
    email: 'zhaoliu@example.com',
    role: '用户',
    status: 'active',
    createdAt: '2024-04-05',
  },
];

export default function UsersPage() {
  const [users] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(
    (user) => user.name.includes(searchTerm) || user.email.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">用户管理</h1>
          <p className="mt-1 text-sm text-zinc-500">管理系统的所有用户</p>
        </div>
        <button className="btn-primary">
          <span className="i-carbon-add mr-2" />
          添加用户
        </button>
      </div>

      <div className="card">
        <div className="border-b border-zinc-200 p-4 dark:border-zinc-700">
          <input
            type="text"
            placeholder="搜索用户..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-base w-full max-w-xs"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-50 dark:bg-zinc-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-zinc-500 uppercase">
                  用户
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-zinc-500 uppercase">
                  邮箱
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-zinc-500 uppercase">
                  角色
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-zinc-500 uppercase">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-zinc-500 uppercase">
                  创建时间
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-zinc-500 uppercase">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary-100 text-primary-600 dark:bg-primary-900/30 flex h-8 w-8 items-center justify-center rounded-full">
                        {user.name[0]}
                      </div>
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 inline-flex rounded-full px-2 py-1 text-xs font-medium">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                      }`}
                    >
                      {user.status === 'active' ? '活跃' : '停用'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-500">{user.createdAt}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                        <span className="i-carbon-edit text-lg text-zinc-600 dark:text-zinc-400" />
                      </button>
                      <button className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                        <span className="i-carbon-trash-can text-lg text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-zinc-200 p-4 dark:border-zinc-700">
          <span className="text-sm text-zinc-500">共 {filteredUsers.length} 条记录</span>
          <div className="flex gap-2">
            <button className="btn-secondary px-3 py-1">上一页</button>
            <button className="btn-secondary px-3 py-1">下一页</button>
          </div>
        </div>
      </div>
    </div>
  );
}
