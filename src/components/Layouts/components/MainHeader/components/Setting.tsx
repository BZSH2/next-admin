'use client'

import Icon from '@/Icon'
import { useI18n } from '@I18n'
import { useRef } from 'react'
import ActionBlock from './ActionBlock'
import SettingDrawer, { type SettingDrawerRef } from './SettingDrawer'

export default function SettingDrawerAction() {
  const settingDrawerRef = useRef<SettingDrawerRef | null>(null)
  const { t } = useI18n()

  return (
    <>
      <ActionBlock title={t('界面设置')} onClick={() => settingDrawerRef.current?.open()}>
        <Icon iconName="layout-cog" size={16} />
      </ActionBlock>

      <SettingDrawer ref={settingDrawerRef} />
    </>
  )
}
