import type { Metadata } from 'next'

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
} {
  // 从传入的混合配置中，剥离出所有官方支持的 Metadata 字段
  // （实际上在运行时，多余的字段传给 Next.js 的 metadata 也不会报错，
  //   但为了极致的规范，我们直接把完整的 meta 作为 metadata 返回，因为 TypeScript 类型已经保证了兼容性）
  return {
    pageMeta: meta,
    metadata: meta as Metadata,
  }
}
