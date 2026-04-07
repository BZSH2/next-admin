'use client'

import { useSyncExternalStore } from 'react'
import MainHeader from './components/MainHeader'
import Sidebar from './components/Sidebar/index'
import { useLayoutModeInitializer } from './hooks/useLayoutMode'

// 空的订阅函数，因为我们只需要用来区分客户端和服务端
const emptySubscribe = () => () => {}

export default function Layouts({ children }: { children: React.ReactNode }) {
  useLayoutModeInitializer()

  // 使用 useSyncExternalStore 优雅地处理 hydration
  // 它的 getSnapshot 只会在客户端返回 true，getServerSnapshot 会在服务端返回 false
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  // 如果客户端还未挂载完成（包括服务端渲染阶段），为了防止菜单展开/收起状态闪烁，
  // 我们暂时不渲染主体内容，或者渲染一个隐藏/骨架状态。
  // 注意：这会导致首屏略微变慢，但能彻底解决状态不一致导致的抖动。
  if (!isClient) {
    return null // 或者渲染一个骨架屏
  }

  // 在 Next.js App Router 中，最优雅且支持 Server Component 的“单文件”样式方案
  // 就是使用 Utility Classes (如你项目中已安装的 UnoCSS/Tailwind)
  return (
    <div className="flex min-h-screen w-full bg-slate-100 text-slate-900">
      <Sidebar />
      <main className="relative flex h-screen flex-1 flex-col overflow-hidden">
        <MainHeader />

        <div className="p-10px flex-1 overflow-x-hidden overflow-y-auto">
          <div className="min-h-full rounded-md border border-slate-200 bg-white">{children}</div>
        </div>
      </main>
    </div>
  )
}
