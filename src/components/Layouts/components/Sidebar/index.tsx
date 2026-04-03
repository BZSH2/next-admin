'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setCollapsed } from '@/store/slices/uiSlice'
import { Drawer, Layout } from 'antd'
import { useCallback } from 'react'
import { useLayoutMode } from '../../hooks/useLayoutMode'
import Collapsed from './components/Collapsed'
import Logo from './components/Logo'
import Menu from './components/Menu'

const { Sider } = Layout

export default function Sidebar() {
  const dispatch = useAppDispatch()
  const collapsed = useAppSelector((s) => s.ui.collapsed)
  const { isMobile, mobileSidebarOpen, hideMobileSidebar } = useLayoutMode()
  const onSetCollapsed = useCallback((v: boolean) => dispatch(setCollapsed(v)), [dispatch])

  if (isMobile) {
    return (
      <Drawer
        placement="left"
        size={220}
        open={mobileSidebarOpen}
        onClose={hideMobileSidebar}
        title={null}
        closable={false}
        styles={{
          header: { display: 'none' },
          body: { padding: 0, background: '#ffffff' },
        }}
      >
        <div className="flex h-full flex-col">
          <Logo collapsed={false} />
          <div className="flex-1 overflow-x-hidden overflow-y-auto">
            <Menu onNavigate={hideMobileSidebar} />
          </div>
        </div>
      </Drawer>
    )
  }

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={220}
      collapsedWidth={72}
      className="sticky top-0 h-screen border-r border-slate-200 bg-white"
      theme="light"
    >
      <div className="flex h-full flex-col">
        <Logo collapsed={collapsed} />
        <div className="flex-1 overflow-x-hidden overflow-y-auto">
          <Menu />
        </div>
        <div className="flex justify-center border-t border-slate-700/50 py-2">
          <Collapsed collapsed={collapsed} onCollapse={onSetCollapsed} />
        </div>
      </div>
    </Sider>
  )
}
