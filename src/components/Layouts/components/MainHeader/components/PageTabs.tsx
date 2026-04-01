'use client';

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { menuConfig } from '@/config/menu';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addOrActivate, remove, type TabItem } from '@/store/slices/tabsSlice';

const flattenMenu = (items: MenuItem[], acc: Record<string, string> = {}) => {
  for (const it of items) {
    acc[it.key] = it.title;
    if (it.children) flattenMenu(it.children, acc);
  }
  return acc;
};

const titleMap = flattenMenu(menuConfig);

const getTitleByPath = (path: string) => {
  return titleMap[path] ?? decodeURIComponent(path.split('/').filter(Boolean).pop() || '首页');
};

export default function PageTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { items, activeKey } = useAppSelector((s) => s.tabs);

  useEffect(() => {
    const title = getTitleByPath(pathname);
    dispatch(
      addOrActivate({ key: pathname, title, closable: pathname !== '/dashboard' } satisfies TabItem)
    );
  }, [pathname, dispatch]);

  const tabs: TabsProps['items'] = useMemo(
    () =>
      items.map((t) => ({
        key: t.key,
        label: t.title,
        closable: t.closable ?? true,
      })),
    [items]
  );

  const onChange: TabsProps['onChange'] = (key) => {
    router.push(String(key));
  };

  const onEdit: TabsProps['onEdit'] = (targetKey, action) => {
    if (action === 'remove') {
      dispatch(remove(String(targetKey)));
    }
  };

  return (
    <Tabs
      type="editable-card"
      hideAdd
      size="small"
      activeKey={activeKey || pathname}
      items={tabs}
      onChange={onChange}
      onEdit={onEdit}
    />
  );
}
