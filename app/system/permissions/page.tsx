'use client';

import { useState } from 'react';

interface Permission {
  id: number;
  name: string;
  key: string;
  description: string;
  category: string;
}

const mockPermissions: Permission[] = [
  {
    id: 1,
    name: '查看用户',
    key: 'user:read',
    description: '查看用户列表和详情',
    category: '用户管理',
  },
  {
    id: 2,
    name: '管理用户',
    key: 'user:write',
    description: '创建、编辑、删除用户',
    category: '用户管理',
  },
  {
    id: 3,
    name: '查看角色',
    key: 'role:read',
    description: '查看角色列表和详情',
    category: '角色管理',
  },
  {
    id: 4,
    name: '管理角色',
    key: 'role:write',
    description: '创建、编辑、删除角色',
    category: '角色管理',
  },
  {
    id: 5,
    name: '查看权限',
    key: 'permission:read',
    description: '查看权限列表',
    category: '权限管理',
  },
  {
    id: 6,
    name: '管理权限',
    key: 'permission:write',
    description: '创建、编辑权限',
    category: '权限管理',
  },
  {
    id: 7,
    name: '查看设置',
    key: 'settings:read',
    description: '查看系统设置',
    category: '系统设置',
  },
  {
    id: 8,
    name: '管理设置',
    key: 'settings:write',
    description: '修改系统设置',
    category: '系统设置',
  },
];

const categories = ['全部', '用户管理', '角色管理', '权限管理', '系统设置'];

export default function PermissionsPage() {
  const [permissions] = useState<Permission[]>(mockPermissions);
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const filteredPermissions = permissions.filter(
    (perm) => selectedCategory === '全部' || perm.category === selectedCategory
  );

  const groupedPermissions = filteredPermissions.reduce<Record<string, Permission[]>>(
    (acc, perm) => {
      const arr = acc[perm.category] ?? (acc[perm.category] = []);
      arr.push(perm);
      return acc;
    },
    {}
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">权限管理</h1>
          <p className="mt-1 text-sm text-zinc-500">管理系统权限配置</p>
        </div>
        <button className="btn-primary">
          <span className="i-carbon-add mr-2" />
          添加权限
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-primary-600 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {Object.entries(groupedPermissions).map(([category, perms]) => (
          <div key={category} className="card">
            <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-700">
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">{category}</h2>
            </div>
            <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
              {perms.map((perm) => (
                <div
                  key={perm.id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-primary-100 dark:bg-primary-900/30 flex h-10 w-10 items-center justify-center rounded-lg">
                      <span className="i-carbon-key text-primary-600 dark:text-primary-400 text-xl" />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">{perm.name}</p>
                      <p className="text-sm text-zinc-500">{perm.key}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="hidden text-sm text-zinc-500 md:block">{perm.description}</p>
                    <div className="flex gap-1">
                      <button className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                        <span className="i-carbon-edit text-zinc-600 dark:text-zinc-400" />
                      </button>
                      <button className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                        <span className="i-carbon-trash-can text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
