'use client'
import { languages } from '@/config/locale.config'
import Icon from '@/Icon'
import { setCookie } from '@/utils'
import { Dropdown, type MenuProps } from 'antd'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import ActionBlock from './ActionBlock'

export default function LocaleAction() {
  const router = useRouter()
  const currentLocale = useLocale()
  const currentShortLocale = currentLocale.split('-')[0]
  const selectedLocaleCode =
    languages.find((item) => item.code.split('-')[0] === currentShortLocale)?.code ??
    languages[0]?.code

  const items: MenuProps['items'] = languages.map((item) => ({
    key: item.code,
    label: item.nativeName,
  }))

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    const locale = key.split('-')[0]
    setCookie('NEXT_LOCALE', locale as Cookie.Value<'NEXT_LOCALE'>, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    })
    router.refresh()
  }

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        selectedKeys: selectedLocaleCode ? [selectedLocaleCode] : [],
        onClick: handleMenuClick,
      }}
      trigger={['hover']}
      placement="bottom"
    >
      <ActionBlock>
        <Icon iconName="layout-languages" size={16} />
      </ActionBlock>
    </Dropdown>
  )
}
