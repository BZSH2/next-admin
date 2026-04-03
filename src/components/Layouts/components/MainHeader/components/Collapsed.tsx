'use client'

import { useLayoutMode } from '@/components/Layouts/hooks/useLayoutMode'
import { useI18n } from '@I18n'
import ActionBlock from './ActionBlock'
import Icon from '@/Icon'

export default function Collapsed() {
  const { showMobileSidebar } = useLayoutMode()
  const { t } = useI18n()
  return (
    <ActionBlock title={t('打开侧边导航')} onClick={showMobileSidebar}>
      <Icon iconName="layout-fence" size={18} className="rotate-90" />
    </ActionBlock>
  )
}
