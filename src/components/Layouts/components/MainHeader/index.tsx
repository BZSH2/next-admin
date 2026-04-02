'use client'

import PageTabs from './components/PageTabs'
import Actions from './components/Actions'
import { useLayoutMode } from '../../hooks/useLayoutMode'
import Collapsed from './components/Collapsed'

export default function MainHeader() {
  const { isMobile } = useLayoutMode()

  const compactActions = isMobile

  return (
    <header className="h-44px px-12px flex items-center justify-between bg-white">
      {isMobile ? <Collapsed /> : <PageTabs />}
      <Actions compact={compactActions} />
    </header>
  )
}
