'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setPrimaryColor } from '@/store/slices/uiSlice'
import { CheckOutlined } from '@ant-design/icons'
import { useI18n } from '@I18n'
import { Drawer, Input, Space, Typography } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

export interface SettingDrawerRef {
  open: () => void
}

const PRESET_COLORS: Storage.Value<'primaryColor'>[] = [
  '#1677ff',
  '#13c2c2',
  '#52c41a',
  '#faad14',
  '#fa541c',
  '#eb2f96',
  '#722ed1',
  '#2f54eb',
]

const HEX_COLOR_REGEXP = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/

const normalizeHexColor = (value: string) => value.trim().toLowerCase()
const isValidHexColor = (value: string): value is Storage.Value<'primaryColor'> =>
  HEX_COLOR_REGEXP.test(value)

const SettingDrawer = forwardRef<SettingDrawerRef>(function SettingDrawer(_, ref) {
  const [open, setOpen] = useState(false)
  const [customColor, setCustomColor] = useState('')
  const { t } = useI18n()
  const dispatch = useAppDispatch()
  const primaryColor = useAppSelector((state) => state.ui.primaryColor)

  const applyPrimaryColor = (color: Storage.Value<'primaryColor'>) => {
    dispatch(setPrimaryColor(color))
    setCustomColor(color)
  }

  useEffect(() => {
    setCustomColor(primaryColor)
  }, [primaryColor])

  const commitCustomColor = () => {
    const nextColor = normalizeHexColor(customColor)
    if (!isValidHexColor(nextColor)) return
    applyPrimaryColor(nextColor)
  }

  const normalizedCustomColor = normalizeHexColor(customColor)
  const isCustomColorInvalid =
    normalizedCustomColor.length > 0 && !isValidHexColor(normalizedCustomColor)

  useImperativeHandle(
    ref,
    () => ({
      open: () => setOpen(true),
    }),
    []
  )

  return (
    <Drawer title={t('界面设置')} open={open} size={320} onClose={() => setOpen(false)}>
      <Space direction="vertical" size={12} className="w-full">
        <Typography.Text strong>主题色</Typography.Text>
        <div className="flex flex-wrap gap-2">
          {PRESET_COLORS.map((color) => {
            const active = primaryColor === color
            return (
              <button
                key={color}
                type="button"
                className={`flex h-8 w-8 items-center justify-center rounded-full border transition-transform hover:scale-105 ${
                  active ? 'border-slate-900' : 'border-transparent'
                }`}
                style={{
                  background: color,
                }}
                onClick={() => applyPrimaryColor(color)}
              >
                {active ? <CheckOutlined className="text-white" /> : null}
              </button>
            )
          })}
        </div>
        <Space.Compact className="w-full">
          <div className="h-32px w-48px rounded-2 relative overflow-hidden border border-solid border-[#d9d9d9]">
            <input
              type="color"
              value={primaryColor}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              onChange={(event) => {
                applyPrimaryColor(event.target.value.toLowerCase() as Storage.Value<'primaryColor'>)
              }}
            />
            <div className="h-full w-full" style={{ backgroundColor: primaryColor }} />
          </div>
          <Input
            value={customColor}
            status={isCustomColorInvalid ? 'error' : ''}
            onChange={(event) => setCustomColor(event.target.value)}
            onPressEnter={commitCustomColor}
            onBlur={commitCustomColor}
            maxLength={7}
            placeholder="#1677ff"
          />
        </Space.Compact>
      </Space>
    </Drawer>
  )
})

export default SettingDrawer
