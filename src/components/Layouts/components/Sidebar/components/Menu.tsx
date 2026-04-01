'use client';

import { useEffect, useMemo, useState } from 'react';
import { Menu as AntdMenu } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import type { MenuProps } from 'antd';
import type { ItemType, MenuItemType } from 'antd/es/menu/interface';
import Icon from '@/Icon';
import { menuConfig } from '@/config/menu';

const getOpenKeysFromPath = (path: string) => {
  const parts = path.split('/').filter(Boolean);
  return parts.map((_, index) => `/${parts.slice(0, index + 1).join('/')}`);
};

const toMenuItems = (items: MenuItem[]): ItemType<MenuItemType>[] =>
  items.map((item) => ({
    key: item.key,
    label: item.title,
    icon: <Icon iconName={item.icon ?? 'menus/hello'} size={18} />,
    children: item.children?.length ? toMenuItems(item.children) : undefined,
  }));

export default function Menu() {
  const router = useRouter();
  const pathname = usePathname();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const items = useMemo(() => toMenuItems(menuConfig), []);

  useEffect(() => {
    setOpenKeys(getOpenKeysFromPath(pathname));
  }, [pathname]);

  const onClick: MenuProps['onClick'] = (e) => {
    router.push(String(e.key));
  };

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys as string[]);
  };

  return (
    <AntdMenu
      theme="dark"
      selectedKeys={[pathname]}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      mode="inline"
      items={items}
      onClick={onClick}
    />
  );
}
