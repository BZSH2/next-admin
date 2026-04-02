'use client'

import { useLayoutMode } from '@/components/Layouts/hooks/useLayoutMode'
import ActionBlock from './ActionBlock'
import Icon from '@/Icon'

export default function Collapsed() {
  const { showMobileSidebar } = useLayoutMode()
  return (
    <ActionBlock title="打开侧边导航" onClick={showMobileSidebar}>
      <Icon iconName="layout-fence" size={18} className="rotate-90" />
    </ActionBlock>
  )
}
