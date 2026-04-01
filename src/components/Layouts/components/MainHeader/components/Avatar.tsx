'use client';

import { DownOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useRouter } from 'next/navigation';

interface AvatarDropdownProps {
  compact?: boolean;
}

export default function AvatarDropdown({ compact = false }: AvatarDropdownProps) {
  const router = useRouter();

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '账户设置',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      danger: true,
      label: '退出登录',
    },
  ];

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      router.push('/login');
    }
  };

  return (
    <Dropdown menu={{ items, onClick }} trigger={['click']}>
      <button
        type="button"
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-1.5 py-1 text-slate-700"
      >
        <Avatar size={22} icon={<UserOutlined />} />
        {!compact ? <span className="text-xs font-medium text-slate-600">admin</span> : null}
        {!compact ? <DownOutlined className="text-[10px] text-slate-400" /> : null}
      </button>
    </Dropdown>
  );
}
