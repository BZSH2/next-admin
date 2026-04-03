'use client'

import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { menuConfig } from '@/config/menu'
import { useI18n } from '@I18n'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { addOrActivate, remove, syncTitles, type TabItem } from '@/store/slices/tabsSlice'

const flattenMenu = (
  items: MenuItem[],
  tr: (key: string) => string,
  acc: Record<string, string> = {}
) => {
  for (const it of items) {
    acc[it.key] = tr(it.title) || it.title
    if (it.children) flattenMenu(it.children, tr, acc)
  }
  return acc
}

export default function PageTabs() {
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useI18n()
  const dispatch = useAppDispatch()
  const { items, activeKey } = useAppSelector((s) => s.tabs)
  const titleMap = useMemo(() => flattenMenu(menuConfig, t), [t])

  useEffect(() => {
    dispatch(syncTitles(titleMap))
  }, [titleMap, dispatch])

  useEffect(() => {
    const fallback = pathname.split('/').filter(Boolean).pop() || ''
    const title = titleMap[pathname] ?? decodeURIComponent(fallback)
    dispatch(
      addOrActivate({ key: pathname, title, closable: pathname !== '/dashboard' } satisfies TabItem)
    )
  }, [pathname, titleMap, dispatch])

  const tabs: TabsProps['items'] = items.map((tab) => ({
    key: tab.key,
    label: tab.title,
    closable: tab.closable ?? true,
  }))

  const onChange: TabsProps['onChange'] = (key) => {
    router.push(String(key))
  }

  const onEdit: TabsProps['onEdit'] = (targetKey, action) => {
    if (action === 'remove') {
      dispatch(remove(String(targetKey)))
    }
  }

  return (
    <>
      <Tabs
        className="pages-tabs flex h-full flex-1 justify-end"
        type="editable-card"
        hideAdd
        size="small"
        tabBarStyle={{ margin: 0 }}
        activeKey={activeKey || pathname}
        items={tabs}
        onChange={onChange}
        onEdit={onEdit}
      />
      <style jsx>{`
        :global(.pages-tabs .ant-tabs-content-holder) {
          display: none;
        }
      `}</style>
    </>
  )
}
