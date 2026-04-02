'use client'

import AvatarDropdown from './Avatar'
import FullscreenAction from './Fullscreen'
import LocaleAction from './Locale'
import SettingDrawerAction from './Setting'

interface ActionsProps {
  compact?: boolean
}

export default function Actions({ compact = false }: ActionsProps) {
  return (
    <div className="flex h-full items-center">
      {!compact ? <LocaleAction /> : null}
      {!compact ? <FullscreenAction /> : null}
      <SettingDrawerAction />
      <AvatarDropdown compact={compact} />
    </div>
  )
}
