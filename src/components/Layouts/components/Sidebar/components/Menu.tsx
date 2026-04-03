'use client'

import Icon from '@/Icon'
import { menuConfig } from '@/config/menu'
import { useI18n } from '@I18n'
import type { MenuProps } from 'antd'
import { Menu as AntdMenu } from 'antd'
import type { ItemType, MenuItemType } from 'antd/es/menu/interface'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'

const getOpenKeysFromPath = (path: string) => {
  const parts = path.split('/').filter(Boolean)
  return parts.map((_, index) => `/${parts.slice(0, index + 1).join('/')}`)
}

const collectKeys = (items: MenuItem[], set = new Set<string>()) => {
  for (const it of items) {
    set.add(it.key)
    if (it.children?.length) collectKeys(it.children, set)
  }
  return set
}

const resolveSelectedKey = (path: string, keys: Set<string>) => {
  if (keys.has(path)) return path
  const parts = path.split('/').filter(Boolean)
  for (let i = parts.length; i >= 1; i--) {
    const p = `/${parts.slice(0, i).join('/')}`
    if (keys.has(p)) return p
  }
  return ''
}

const toMenuItems = (items: MenuItem[], t: (key: string) => string): ItemType<MenuItemType>[] =>
  items.map((item) => {
    const label = t(item.title) || item.title
    return {
      key: item.key,
      label,
      icon: <Icon iconName={item.icon ?? 'menus/hello'} size={18} />,
      children: item.children?.length ? toMenuItems(item.children, t) : undefined,
    }
  })

interface MenuPropsExt {
  onNavigate?: () => void
}

export default function Menu({ onNavigate }: MenuPropsExt) {
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useI18n()
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const items = useMemo(() => toMenuItems(menuConfig, t), [t])
  const keySet = useMemo(() => collectKeys(menuConfig), [])
  const selectedKey = useMemo(() => resolveSelectedKey(pathname, keySet), [pathname, keySet])

  useEffect(() => {
    setOpenKeys(getOpenKeysFromPath(pathname))
  }, [pathname])

  const onClick = useCallback<NonNullable<MenuProps['onClick']>>(
    (e) => {
      router.push(String(e.key))
      onNavigate?.()
    },
    [router, onNavigate]
  )

  const onOpenChange = useCallback<NonNullable<MenuProps['onOpenChange']>>((keys) => {
    setOpenKeys(keys as string[])
  }, [])

  return (
    <AntdMenu
      theme="light"
      className="border-r-0 pt-2"
      selectedKeys={selectedKey ? [selectedKey] : []}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      mode="inline"
      items={items}
      onClick={onClick}
      inlineIndent={20}
    />
  )
}
