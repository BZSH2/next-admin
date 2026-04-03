import type { Metadata } from 'next'
import { getMessages } from 'next-intl/server'

/**
 * 页面元数据定义辅助函数
 *
 * 通过这个函数，你只需要编写一次配置，就可以同时生成：
 * 1. 供 Next.js 框架使用的标准 `metadata` (用于 SEO 和 <head> 标签)
 * 2. 供业务脚本提取使用的自定义 `pageMeta` (用于生成菜单和面包屑)
 *
 * @example
 * ```tsx
 * import { definePageMeta } from '@/utils/meta';
 *
 * export const { pageMeta, metadata } = definePageMeta({
 *   title: '工作台',
 *   icon: 'DashboardOutlined',
 *   sort: 1,
 *   description: '系统数据监控与分析'
 * });
 * ```
 */
export function definePageMeta(meta: PageMeta): {
  pageMeta: PageMeta
  metadata: Metadata
  generateMetadata: () => Promise<Metadata>
} {
  const description = typeof meta.description === 'string' ? meta.description : undefined
  const metadata: Metadata = {
    title: meta.title,
    description,
  }

  return {
    pageMeta: meta,
    metadata,
    generateMetadata: async () =>
      buildPageMetadata({
        title: meta.title,
        ...(description ? { description } : {}),
      }),
  }
}

export async function buildPageMetadata(meta: { title: string; description?: string | null }) {
  const messages = (await getMessages()) as Record<string, unknown>
  const getText = (key?: string | null) => {
    if (!key) return undefined
    const value = messages[key]
    return typeof value === 'string' ? value : key
  }

  return {
    title: getText(meta.title),
    description: getText(meta.description),
  } satisfies Metadata
}
