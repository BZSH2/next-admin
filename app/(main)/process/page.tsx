'use client'
import Process from '@/components/Process'
import { definePageMeta } from '@/utils/meta'

definePageMeta({
  title: '流程',
  icon: 'menus/blackCat',
  sort: 3,
  description: '流程图',
})

export default function LoginPage() {
  return <Process />
}
