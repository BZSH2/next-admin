import { settingConfig } from '@/config/setting.config'
import ReduxProvider from '@/store/providers'
import '@/styles/index.scss'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { Geist, Geist_Mono } from 'next/font/google'

// 全局字体变量，挂载到 body className 供样式层使用
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// 站点基础元信息
export const metadata: Metadata = {
  title: `${settingConfig.title} - 后台管理系统`,
  description: '基于 Next.js 16 的企业级后台管理系统',
  icons: '/favicon.ico',
}

// 生成首屏主题引导脚本，避免 hydration 前出现主题闪烁
const createThemeBootstrapScript = () => {
  const primaryKey = `${settingConfig.cacheKeyPrefix}primaryColor`
  const defaultPrimaryColor = settingConfig.primaryColor

  return `
    (function () {
      try {
        var primaryKey = ${JSON.stringify(primaryKey)};
        var primary = ${JSON.stringify(defaultPrimaryColor)};
        var rawPrimary = window.localStorage.getItem(primaryKey);
        if (rawPrimary !== null) primary = JSON.parse(rawPrimary);
        document.documentElement.classList.remove('dark');
        document.documentElement.dataset.theme = 'light';
        document.documentElement.style.colorScheme = 'light';
        document.documentElement.style.setProperty('--primary', primary);
      } catch (e) {}
    })();
  `
}

// 在服务端提前生成脚本字符串，客户端首屏立即执行
const themeBootstrapScript = createThemeBootstrapScript()

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} className="h-full" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} h-full`}>
        {/* 先注入主题脚本，确保 Provider 渲染前就完成主题同步 */}
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
        {/* Provider 顺序：国际化 -> 状态管理 -> Ant Design 样式注册 */}
        <NextIntlClientProvider messages={messages}>
          <ReduxProvider>
            <AntdRegistry>{children}</AntdRegistry>
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
