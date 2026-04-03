'use client'
import Icon from '@/Icon'
import { useI18n } from '@I18n'
import { useEffect, useState } from 'react'
import ActionBlock from './ActionBlock'

export default function FullscreenAction() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const { t } = useI18n()

  useEffect(() => {
    const handler = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    handler()
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  const toggle = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
      return
    }
    await document.exitFullscreen()
  }

  return (
    <ActionBlock title={isFullscreen ? t('退出全屏') : t('全屏')} onClick={toggle}>
      <Icon iconName={`layout-${isFullscreen ? 'maximize' : 'minimize'}`} size={16} />
    </ActionBlock>
  )
}
