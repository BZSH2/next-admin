import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import '@/styles/index.scss'
import ReduxProvider from '@/store/providers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Next Admin - 后台管理系统',
  description: '基于 Next.js 16 的企业级后台管理系统',
  icons: '/favicon.ico',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} h-full`}>
        <ReduxProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </ReduxProvider>
      </body>
    </html>
  )
}
