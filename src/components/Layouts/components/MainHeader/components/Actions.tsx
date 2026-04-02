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
    <div className="ml-2 flex items-center gap-1 border-l border-slate-200 pl-2">
      {!compact ? <LocaleAction /> : null}
      {!compact ? <FullscreenAction /> : null}
      <SettingDrawerAction />
      <AvatarDropdown compact={compact} />
    </div>
  )
}
