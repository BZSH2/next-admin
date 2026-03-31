'use client';

import { Layout } from 'antd';
import Logo from './components/Logo';
import Menu from './components/Menu';
import Collapsed from './components/Collapsed';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="sticky top-0 h-screen"
      theme="dark"
    >
      <div className="flex h-full flex-col">
        <Logo collapsed={collapsed} />
        <div className="flex-1 overflow-x-hidden overflow-y-auto">
          <Menu />
        </div>
        <div className="flex justify-center border-t border-slate-700/50 py-2">
          <Collapsed collapsed={collapsed} onCollapse={setCollapsed} />
        </div>
      </div>
    </Sider>
  );
}
