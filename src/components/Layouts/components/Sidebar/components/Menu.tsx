'use client';

import React, { useEffect, useState } from 'react';
import { Menu as AntdMenu } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import type { MenuProps } from 'antd';
import { menuConfig } from '@/config/menu';
// 你之前可能在这个文件里直接使用了 menuConfig
// 注意：现在 menuConfig 里面的 icon 是纯字符串，你需要自己映射成 React 节点才能给 Antd 使用

// 辅助函数：根据当前路由路径，推导出需要展开的父级菜单的 keys
const getOpenKeysFromPath = (path: string) => {
  const parts = path.split('/').filter(Boolean);
  // 例如：/settings/profile => ['/settings', '/settings/profile']
  return parts.map((_, index) => `/${parts.slice(0, index + 1).join('/')}`);
};

export default function Menu() {
  const router = useRouter();
  const pathname = usePathname();

  // 维护展开的菜单项状态
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  // 当路由变化时，自动展开对应的父级菜单
  useEffect(() => {
    setOpenKeys(getOpenKeysFromPath(pathname));
  }, [pathname]);

  const onClick: MenuProps['onClick'] = (e) => {
    router.push(e.key);
  };

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <AntdMenu
      theme="dark"
      selectedKeys={[pathname]}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      mode="inline"
      items={menuConfig} // 数据来源于配置文件，或未来可替换为 API 接口数据
      onClick={onClick}
    />
  );
}
