import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button } from 'antd'

interface CollapsedProps {
  collapsed: boolean
  onCollapse: (collapsed: boolean) => void
}

export default function Collapsed({ collapsed, onCollapse }: CollapsedProps) {
  return (
    <Button
      type="text"
      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      onClick={() => onCollapse(!collapsed)}
      className="text-slate-500"
      style={{
        fontSize: '16px',
        width: 40,
        height: 40,
      }}
    />
  )
}
