'use client'
import { Dropdown, type MenuProps } from 'antd'
import { languages } from '@/config/locale.config'
import ActionBlock from './ActionBlock'
import Icon from '@/Icon'
import { useRouter } from 'next/navigation'

export default function LocaleAction() {
  const router = useRouter()

  const items: MenuProps['items'] = languages.map((item) => ({
    key: item.code,
    label: item.nativeName,
  }))

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    // Determine the short locale string, e.g., 'en-US' -> 'en', 'zh-CN' -> 'zh'
    const locale = key.split('-')[0]
    // Set cookie that our src/i18n/request.ts reads
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`
    // Refresh to apply new language
    router.refresh()
  }

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
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
