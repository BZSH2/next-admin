'use client'

import { GlobalOutlined } from '@ant-design/icons'
import { Select } from 'antd'
import { localeOptions } from '@/config/locale.config'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setLocale, type LocaleType } from '@/store/slices/uiSlice'

export default function LocaleAction() {
  const locale = useAppSelector((s) => s.ui.locale)
  const dispatch = useAppDispatch()

  return (
    <Select
      size="small"
      variant="borderless"
      value={locale}
      style={{ width: 140 }}
      className="rounded-md bg-slate-100"
      suffixIcon={<GlobalOutlined />}
      options={localeOptions}
      onChange={(v) => dispatch(setLocale(v as LocaleType))}
    />
  )
}
