'use client'

import { MenuUnfoldOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import PageTabs from './components/PageTabs'
import Actions from './components/Actions'
import { useLayoutMode } from '../../hooks/useLayoutMode'

export default function MainHeader() {
  const { isMobile, showMobileSidebar } = useLayoutMode()
  const compactActions = isMobile

  return (
    <header className="sticky top-0 z-20 flex h-14 w-full shrink-0 items-center justify-between border-b border-slate-200 bg-white px-3">
      <div className="flex min-w-0 flex-1 items-center gap-2 pr-3">
        {isMobile && (
          <Button
            type="text"
            icon={<MenuUnfoldOutlined />}
            onClick={showMobileSidebar}
            aria-label="打开侧边导航"
          />
        )}
        {!isMobile && <PageTabs />}
      </div>
      <Actions compact={compactActions} />
    </header>
  )
}
