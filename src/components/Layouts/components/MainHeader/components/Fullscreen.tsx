'use client'
import Icon from '@/Icon'
import { useEffect, useState } from 'react'
import ActionBlock from './ActionBlock'

export default function FullscreenAction() {
  const [isFullscreen, setIsFullscreen] = useState(false)

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
    <ActionBlock title={isFullscreen ? '退出全屏' : '全屏'} onClick={toggle}>
      <Icon iconName={`layout-${isFullscreen ? 'maximize' : 'minimize'}`} size={16} />
    </ActionBlock>
  )
}
