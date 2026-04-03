'use client'

import { Tooltip } from 'antd'
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'

interface ActionBlockProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
  children?: ReactNode
  title?: string
}

export default forwardRef<HTMLButtonElement, ActionBlockProps>(function ActionBlock(
  { children, title, onClick, className = '', ...rest },
  ref
) {
  return (
    <Tooltip title={title}>
      <button
        ref={ref}
        className={`px-10px action-block flex h-full cursor-pointer items-center transition-colors hover:bg-slate-100 ${className}`}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    </Tooltip>
  )
})
