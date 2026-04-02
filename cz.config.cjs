const { defineConfig } = require('cz-git')

const commitTypes = [
  { value: 'test', name: 'test:     ✅ Tests | 测试', emoji: ':white_check_mark:' },
  { value: 'feat', name: 'feat:     ✨ Features | 新功能', emoji: ':sparkles:' },
  { value: 'fix', name: 'fix:      🐞 Bug Fixes | Bug 修复', emoji: ':lady_beetle:' },
  { value: 'chore', name: 'chore:    🚀 Chore | 构建/工程依赖/工具', emoji: ':rocket:' },
  { value: 'docs', name: 'docs:     ✏️ Documentation | 文档', emoji: ':pencil2:' },
  {
    value: 'refactor',
    name: 'refactor: ♻️ Code Refactoring | 代码重构',
    emoji: ':recycle:',
  },
  { value: 'style', name: 'style:    💄 Styles | 风格', emoji: ':lipstick:' },
  {
    value: 'ci',
    name: 'ci:       👷 Continuous Integration | CI 配置',
    emoji: ':construction_worker:',
  },
  {
    value: 'perf',
    name: 'perf:     ⚡ Performance Improvements | 性能优化',
    emoji: ':zap:',
  },
  {
    value: 'release',
    name: 'release:  🏹 Create a release commit | 发版提交',
    emoji: ':bow_and_arrow:',
  },
  { value: 'revert', name: 'revert:   ⏪ Revert | 回退', emoji: ':rewind:' },
  { value: 'build', name: 'build:    📦 Build System | 打包构建', emoji: ':package:' },
]

module.exports = defineConfig({
  useEmoji: true,
  allowBreakingChanges: ['feat', 'fix', 'refactor'],
  allowCustomScopes: true,
  allowEmptyScopes: true,
  enableMultipleScopes: false,
  scopes: [],
  scopesSearchValue: true,
  defaultType: 'feat',
  maxMessageLength: 64,
  minMessageLength: 3,
  skipQuestions: ['confirmCommit'],
  issuePrefixes: [
    { value: 'closed', name: 'closed: 已关闭' },
    { value: 'refs', name: 'refs: 仅关联' },
  ],
  messages: {
    type: '请选择提交类型：',
    scope: '请输入影响范围（可选）：',
    customScope: '请输入自定义范围：',
    subject: '请填写简短描述（必填）：\n',
    body: '请填写详细说明（可选，使用 "|" 换行）：\n',
    markBreaking: '是否包含破坏性变更？',
    breaking: '请描述破坏性变更（可选，使用 "|" 换行）：\n',
    footerPrefixesSelect: '请选择 Issue 关联方式（可选）：',
    customFooterPrefix: '请输入自定义 Issue 前缀：',
    footer: '请输入关联的 Issue，例如 #123（可选）：\n',
  },
  types: commitTypes,
})
