'use client'

import { Drawer, Segmented, Select, Space, Switch, Typography } from 'antd'
import { localeOptions } from '@/config/locale.config'
import {
  setCollapsed,
  setLocale,
  setTheme,
  type LocaleType,
  type Theme,
} from '@/store/slices/uiSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { forwardRef, useImperativeHandle, useState } from 'react'

export interface SettingDrawerRef {
  open: () => void
}

const SettingDrawer = forwardRef<SettingDrawerRef>(function SettingDrawer(_, ref) {
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { theme, collapsed, locale } = useAppSelector((s) => s.ui)

  useImperativeHandle(
    ref,
    () => ({
      open: () => setOpen(true),
    }),
    []
  )

  return (
    <Drawer title="界面设置" open={open} size={320} onClose={() => setOpen(false)}>
      <Space direction="vertical" className="w-full" size={20}>
        <div className="flex items-center justify-between">
          <Typography.Text>主题模式</Typography.Text>
          <Segmented
            size="small"
            value={theme}
            options={[
              { label: '浅色', value: 'light' },
              { label: '深色', value: 'dark' },
              { label: '跟随系统', value: 'system' },
            ]}
            onChange={(v) => dispatch(setTheme(v as Theme))}
          />
        </div>

        <div className="flex items-center justify-between">
          <Typography.Text>折叠菜单</Typography.Text>
          <Switch checked={collapsed} onChange={(v) => dispatch(setCollapsed(v))} />
        </div>

        <div className="flex items-center justify-between">
          <Typography.Text>语言</Typography.Text>
          <Select
            value={locale}
            style={{ width: 170 }}
            options={localeOptions}
            onChange={(v) => dispatch(setLocale(v as LocaleType))}
          />
        </div>
      </Space>
    </Drawer>
  )
})

export default SettingDrawer
