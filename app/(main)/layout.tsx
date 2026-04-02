import React from 'react'
import Layouts from '@/components/Layouts'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <Layouts>{children}</Layouts>
}
