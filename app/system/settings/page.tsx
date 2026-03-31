'use client';

import { useState } from 'react';

type TabKey = 'general' | 'security' | 'notifications' | 'appearance';

interface Tab {
  key: TabKey;
  label: string;
  icon: string;
}

const tabs: Tab[] = [
  { key: 'general', label: '通用设置', icon: 'i-carbon-settings' },
  { key: 'security', label: '安全设置', icon: 'i-carbon-shield' },
  { key: 'notifications', label: '通知设置', icon: 'i-carbon-notification' },
  { key: 'appearance', label: '外观设置', icon: 'i-carbon-paint' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('general');
  const [settings, setSettings] = useState({
    siteName: 'Next Admin',
    siteDescription: '基于 Next.js 的后台管理系统',
    contactEmail: 'admin@example.com',
    allowRegistration: false,
    requireEmailVerification: true,
    enableTwoFactor: false,
    emailNotifications: true,
    pushNotifications: false,
    weeklyReport: true,
    darkMode: false,
    compactMode: false,
  });

  const handleSave = () => {
    alert('设置已保存');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">系统设置</h1>
        <p className="mt-1 text-sm text-zinc-500">配置系统各项参数</p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="lg:w-64">
          <nav className="card p-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  activeTab === tab.key
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20'
                    : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'
                }`}
              >
                <span className={`${tab.icon} text-lg`} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1">
          <div className="card p-6">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">通用设置</h2>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      网站名称
                    </label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                      className="input-base w-full max-w-md"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      网站描述
                    </label>
                    <textarea
                      value={settings.siteDescription}
                      onChange={(e) =>
                        setSettings({ ...settings, siteDescription: e.target.value })
                      }
                      rows={3}
                      className="input-base w-full max-w-md"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      联系邮箱
                    </label>
                    <input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                      className="input-base w-full max-w-md"
                    />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">允许新用户注册</p>
                      <p className="text-sm text-zinc-500">允许普通用户自行注册账户</p>
                    </div>
                    <button
                      onClick={() =>
                        setSettings({ ...settings, allowRegistration: !settings.allowRegistration })
                      }
                      className={`relative h-6 w-11 rounded-full transition-colors ${
                        settings.allowRegistration
                          ? 'bg-primary-600'
                          : 'bg-zinc-300 dark:bg-zinc-600'
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                          settings.allowRegistration ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">邮箱验证</p>
                      <p className="text-sm text-zinc-500">注册时需要验证邮箱</p>
                    </div>
                    <button
                      onClick={() =>
                        setSettings({
                          ...settings,
                          requireEmailVerification: !settings.requireEmailVerification,
                        })
                      }
                      className={`relative h-6 w-11 rounded-full transition-colors ${
                        settings.requireEmailVerification
                          ? 'bg-primary-600'
                          : 'bg-zinc-300 dark:bg-zinc-600'
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                          settings.requireEmailVerification ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">安全设置</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">双因素认证</p>
                      <p className="text-sm text-zinc-500">启用双因素认证提高账户安全</p>
                    </div>
                    <button
                      onClick={() =>
                        setSettings({ ...settings, enableTwoFactor: !settings.enableTwoFactor })
                      }
                      className={`relative h-6 w-11 rounded-full transition-colors ${
                        settings.enableTwoFactor ? 'bg-primary-600' : 'bg-zinc-300 dark:bg-zinc-600'
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                          settings.enableTwoFactor ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">通知设置</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">邮件通知</p>
                      <p className="text-sm text-zinc-500">接收重要事件的邮件通知</p>
                    </div>
                    <button
                      onClick={() =>
                        setSettings({
                          ...settings,
                          emailNotifications: !settings.emailNotifications,
                        })
                      }
                      className={`relative h-6 w-11 rounded-full transition-colors ${
                        settings.emailNotifications
                          ? 'bg-primary-600'
                          : 'bg-zinc-300 dark:bg-zinc-600'
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                          settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">推送通知</p>
                      <p className="text-sm text-zinc-500">接收系统推送通知</p>
                    </div>
                    <button
                      onClick={() =>
                        setSettings({ ...settings, pushNotifications: !settings.pushNotifications })
                      }
                      className={`relative h-6 w-11 rounded-full transition-colors ${
                        settings.pushNotifications
                          ? 'bg-primary-600'
                          : 'bg-zinc-300 dark:bg-zinc-600'
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                          settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">周报</p>
                      <p className="text-sm text-zinc-500">每周接收系统周报</p>
                    </div>
                    <button
                      onClick={() =>
                        setSettings({ ...settings, weeklyReport: !settings.weeklyReport })
                      }
                      className={`relative h-6 w-11 rounded-full transition-colors ${
                        settings.weeklyReport ? 'bg-primary-600' : 'bg-zinc-300 dark:bg-zinc-600'
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                          settings.weeklyReport ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">外观设置</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">深色模式</p>
                      <p className="text-sm text-zinc-500">使用深色主题</p>
                    </div>
                    <button
                      onClick={() => setSettings({ ...settings, darkMode: !settings.darkMode })}
                      className={`relative h-6 w-11 rounded-full transition-colors ${
                        settings.darkMode ? 'bg-primary-600' : 'bg-zinc-300 dark:bg-zinc-600'
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                          settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">紧凑模式</p>
                      <p className="text-sm text-zinc-500">减少界面元素间距</p>
                    </div>
                    <button
                      onClick={() =>
                        setSettings({ ...settings, compactMode: !settings.compactMode })
                      }
                      className={`relative h-6 w-11 rounded-full transition-colors ${
                        settings.compactMode ? 'bg-primary-600' : 'bg-zinc-300 dark:bg-zinc-600'
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                          settings.compactMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button onClick={handleSave} className="btn-primary">
                保存设置
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
