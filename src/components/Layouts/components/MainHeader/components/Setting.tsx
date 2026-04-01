'use client';

import { SettingOutlined } from '@ant-design/icons';
import { Button, Drawer, Segmented, Space, Switch, Typography } from 'antd';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setCollapsed,
  setLocale,
  setTheme,
  type LocaleType,
  type Theme,
} from '@/store/slices/uiSlice';

export default function SettingDrawerAction() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { theme, collapsed, locale } = useAppSelector((s) => s.ui);

  return (
    <>
      <Button
        type="text"
        size="small"
        className="text-slate-600"
        icon={<SettingOutlined />}
        onClick={() => setOpen(true)}
      />
      <Drawer title="界面设置" open={open} width={320} onClose={() => setOpen(false)}>
        <Space direction="vertical" className="w-full" size={20}>
          <div className="flex items-center justify-between">
            <Typography.Text>主题模式</Typography.Text>
            <Segmented
              size="small"
              value={theme}
              options={[
                { label: '浅色', value: 'light' },
                { label: '深色', value: 'dark' },
                { label: '跟随系统', value: 'system' },
              ]}
              onChange={(v) => dispatch(setTheme(v as Theme))}
            />
          </div>

          <div className="flex items-center justify-between">
            <Typography.Text>折叠菜单</Typography.Text>
            <Switch checked={collapsed} onChange={(v) => dispatch(setCollapsed(v))} />
          </div>

          <div className="flex items-center justify-between">
            <Typography.Text>语言</Typography.Text>
            <Segmented
              size="small"
              value={locale}
              options={[
                { label: '中文', value: 'zh-CN' },
                { label: 'English', value: 'en-US' },
              ]}
              onChange={(v) => dispatch(setLocale(v as LocaleType))}
            />
          </div>
        </Space>
      </Drawer>
    </>
  );
}
