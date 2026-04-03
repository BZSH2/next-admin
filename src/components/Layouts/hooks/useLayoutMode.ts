'use client'

import { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { closeMobileSidebar, openMobileSidebar, setIsMobile } from '@/store/slices/layoutSlice'
import { setCollapsed } from '@/store/slices/uiSlice'

const MOBILE_BREAKPOINT = 792
const COLLAPSE_BREAKPOINT = 1200

export const useLayoutModeInitializer = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const handler = () => {
      const width = window.innerWidth
      const nextMobile = width < MOBILE_BREAKPOINT
      dispatch(setIsMobile(nextMobile))
      dispatch(setCollapsed(width < COLLAPSE_BREAKPOINT))
      if (!nextMobile) {
        dispatch(closeMobileSidebar())
      }
    }

    handler()

    // 移除 body 上的 preload 类，允许动画生效
    // 使用 setTimeout 确保在第一次渲染和状态更新完成后执行
    setTimeout(() => {
      document.body.classList.remove('preload')
    }, 50)

    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [dispatch])
}

export const useLayoutMode = () => {
  const dispatch = useAppDispatch()
  const isMobile = useAppSelector((s) => s.layout.isMobile)
  const mobileSidebarOpen = useAppSelector((s) => s.layout.mobileSidebarOpen)

  const showMobileSidebar = useCallback(() => {
    dispatch(openMobileSidebar())
  }, [dispatch])

  const hideMobileSidebar = useCallback(() => {
    dispatch(closeMobileSidebar())
  }, [dispatch])

  return {
    isMobile,
    mobileSidebarOpen,
    showMobileSidebar,
    hideMobileSidebar,
  }
}
