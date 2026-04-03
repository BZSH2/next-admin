'use client'

import { useLayoutMode } from '../../hooks/useLayoutMode'
import Actions from './components/Actions'
import Collapsed from './components/Collapsed'
import PageTabs from './components/PageTabs'

export default function MainHeader() {
  const { isMobile } = useLayoutMode()

  const compactActions = isMobile

  return (
    <header className="h-44px px-12px flex items-center justify-between border-b border-slate-200 bg-white">
      {isMobile ? <Collapsed /> : <PageTabs />}
      <Actions compact={compactActions} />
    </header>
  )
}
