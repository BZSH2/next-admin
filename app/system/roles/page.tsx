'use client';

import { useState } from 'react';

interface Role {
  id: number;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
  createdAt: string;
}

const mockRoles: Role[] = [
  {
    id: 1,
    name: '管理员',
    description: '拥有系统所有权限',
    userCount: 2,
    permissions: [
      'user:read',
      'user:write',
      'role:read',
      'role:write',
      'permission:read',
      'permission:write',
      'settings:read',
      'settings:write',
    ],
    createdAt: '2024-01-01',
  },
  {
    id: 2,
    name: '编辑',
    description: '可以编辑内容，但不能管理用户',
    userCount: 5,
    permissions: ['user:read', 'user:write'],
    createdAt: '2024-01-15',
  },
  {
    id: 3,
    name: '用户',
    description: '普通用户，只有查看权限',
    userCount: 100,
    permissions: ['user:read'],
    createdAt: '2024-02-01',
  },
];

export default function RolesPage() {
  const [roles] = useState<Role[]>(mockRoles);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">角色管理</h1>
          <p className="mt-1 text-sm text-zinc-500">管理用户角色和权限</p>
        </div>
        <button className="btn-primary">
          <span className="i-carbon-add mr-2" />
          添加角色
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <div key={role.id} className="card p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{role.name}</h3>
                <p className="mt-1 text-sm text-zinc-500">{role.description}</p>
              </div>
              <span className="i-carbon-badge text-primary-500 text-2xl" />
            </div>

            <div className="mt-4">
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <span className="i-carbon-user" />
                <span>{role.userCount} 个用户</span>
              </div>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-xs font-medium text-zinc-400 uppercase">权限</p>
              <div className="flex flex-wrap gap-1">
                {role.permissions.slice(0, 4).map((perm) => (
                  <span
                    key={perm}
                    className="inline-flex rounded bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                  >
                    {perm}
                  </span>
                ))}
                {role.permissions.length > 4 && (
                  <span className="inline-flex rounded bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    +{role.permissions.length - 4}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
              <span className="text-xs text-zinc-400">创建于 {role.createdAt}</span>
              <div className="flex gap-1">
                <button className="rounded-lg p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  <span className="i-carbon-edit text-zinc-600 dark:text-zinc-400" />
                </button>
                <button className="rounded-lg p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  <span className="i-carbon-trash-can text-red-600 dark:text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
