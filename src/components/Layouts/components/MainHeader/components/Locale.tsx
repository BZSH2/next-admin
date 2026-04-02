'use client'
import { Dropdown, type MenuProps } from 'antd'
import { languages } from '@/config/locale.config'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setLocale, type LocaleType } from '@/store/slices/uiSlice'
import ActionBlock from './ActionBlock'
import Icon from '@/Icon'

export default function LocaleAction() {
  const locale = useAppSelector((s) => s.ui.locale)
  const dispatch = useAppDispatch()

  const currentLanguage = languages.find((item) => item.code === locale)
  const localeTitle = currentLanguage?.nativeName ?? currentLanguage?.name ?? locale

  const items: MenuProps['items'] = languages.map((item) => ({
    key: item.code,
    label: item.flag
      ? `${item.flag} ${item.nativeName ?? item.name}`
      : (item.nativeName ?? item.name),
  }))

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        selectedKeys: [locale],
        onClick: ({ key }) => dispatch(setLocale(key as LocaleType)),
      }}
    >
      <ActionBlock title={localeTitle}>
        <Icon iconName="layout-languages" size={16} />
      </ActionBlock>
    </Dropdown>
  )
}
