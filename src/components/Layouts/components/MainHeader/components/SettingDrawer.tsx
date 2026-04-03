'use client'

import { Drawer } from 'antd'
import { useI18n } from '@I18n'
import { forwardRef, useImperativeHandle, useState } from 'react'

export interface SettingDrawerRef {
  open: () => void
}

const SettingDrawer = forwardRef<SettingDrawerRef>(function SettingDrawer(_, ref) {
  const [open, setOpen] = useState(false)
  const { t } = useI18n()

  useImperativeHandle(
    ref,
    () => ({
      open: () => setOpen(true),
    }),
    []
  )

  return (
    <Drawer title={t('界面设置')} open={open} size={320} onClose={() => setOpen(false)}>
      11111
    </Drawer>
  )
})

export default SettingDrawer
