'use client'

import { Tooltip } from 'antd'
import { ReactNode } from 'react'

interface ActionBlockProps {
  children: ReactNode
  title?: string
  onClick?: () => void
}

export default function ActionBlock({ children, title, onClick }: ActionBlockProps) {
  return (
    <>
      <Tooltip title={title}>
        <button
          className="px-10px action-block flex h-full cursor-pointer items-center"
          onClick={onClick}
        >
          {children}
        </button>
      </Tooltip>

      <style jsx>
        {`
          .action-block:hover {
            background-color: rgba(246, 246, 246, var(--un-bg-opacity));
          }
        `}
      </style>
    </>
  )
}
