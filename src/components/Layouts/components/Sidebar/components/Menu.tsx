'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
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

const collectKeys = (items: MenuItem[], set = new Set<string>()) => {
  for (const it of items) {
    set.add(it.key);
    if (it.children?.length) collectKeys(it.children, set);
  }
  return set;
};

const resolveSelectedKey = (path: string, keys: Set<string>) => {
  if (keys.has(path)) return path;
  const parts = path.split('/').filter(Boolean);
  for (let i = parts.length; i >= 1; i--) {
    const p = `/${parts.slice(0, i).join('/')}`;
    if (keys.has(p)) return p;
  }
  return '';
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
  const keySet = useMemo(() => collectKeys(menuConfig), []);
  const selectedKey = useMemo(() => resolveSelectedKey(pathname, keySet), [pathname, keySet]);

  useEffect(() => {
    setOpenKeys(getOpenKeysFromPath(pathname));
  }, [pathname]);

  const onClick = useCallback<NonNullable<MenuProps['onClick']>>(
    (e) => {
      router.push(String(e.key));
    },
    [router]
  );

  const onOpenChange = useCallback<NonNullable<MenuProps['onOpenChange']>>((keys) => {
    setOpenKeys(keys as string[]);
  }, []);

  return (
    <AntdMenu
      theme="dark"
      selectedKeys={selectedKey ? [selectedKey] : []}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      mode="inline"
      items={items}
      onClick={onClick}
    />
  );
}
