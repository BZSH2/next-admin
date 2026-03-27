const { defineConfig } = require("cz-git");

const commitTypes = [
  {
    value: "feat",
    name: "feat:     \u2728 \u65b0\u529f\u80fd",
    emoji: ":sparkles:",
  },
  {
    value: "fix",
    name: "fix:      \ud83d\udc1b \u4fee\u590d\u7f3a\u9677",
    emoji: ":bug:",
  },
  {
    value: "docs",
    name: "docs:     \ud83d\udcdd \u6587\u6863\u53d8\u66f4",
    emoji: ":memo:",
  },
  {
    value: "style",
    name: "style:    \ud83d\udc84 \u4ee3\u7801\u683c\u5f0f\u8c03\u6574\uff0c\u4e0d\u5f71\u54cd\u903b\u8f91",
    emoji: ":lipstick:",
  },
  {
    value: "refactor",
    name: "refactor: \ud83d\udd04 \u4ee3\u7801\u91cd\u6784\uff0c\u4e0d\u65b0\u589e\u529f\u80fd\u4e5f\u4e0d\u4fee\u590d\u7f3a\u9677",
    emoji: ":recycle:",
  },
  {
    value: "perf",
    name: "perf:     \u26a1 \u6027\u80fd\u4f18\u5316",
    emoji: ":zap:",
  },
  {
    value: "test",
    name: "test:     \u2705 \u6d4b\u8bd5\u76f8\u5173",
    emoji: ":white_check_mark:",
  },
  {
    value: "build",
    name: "build:    \ud83d\udce6 \u6784\u5efa\u6d41\u7a0b\u6216\u4f9d\u8d56\u8c03\u6574",
    emoji: ":package:",
  },
  {
    value: "ci",
    name: "ci:       \ud83c\udfa1 CI \u914d\u7f6e\u6216\u811a\u672c\u53d8\u66f4",
    emoji: ":ferris_wheel:",
  },
  {
    value: "chore",
    name: "chore:    \ud83d\udd28 \u6742\u9879\u7ef4\u62a4",
    emoji: ":hammer:",
  },
  {
    value: "revert",
    name: "revert:   \u23ea \u56de\u6eda\u63d0\u4ea4",
    emoji: ":rewind:",
  },
];

const scopeOptions = [
  { value: "app", name: "app: \u5e94\u7528\u9875\u9762\u4e0e\u8def\u7531" },
  { value: "styles", name: "styles: \u6837\u5f0f\u4e0e\u4e3b\u9898" },
  { value: "public", name: "public: \u9759\u6001\u8d44\u6e90" },
  { value: "config", name: "config: \u5de5\u7a0b\u914d\u7f6e" },
  { value: "deps", name: "deps: \u4f9d\u8d56\u7ba1\u7406" },
  { value: "scripts", name: "scripts: \u811a\u672c\u547d\u4ee4" },
  { value: "ci", name: "ci: \u6301\u7eed\u96c6\u6210\u6d41\u7a0b" },
  { value: "docs", name: "docs: \u6587\u6863\u8bf4\u660e" },
  { value: "release", name: "release: \u53d1\u5e03\u76f8\u5173" },
];

module.exports = defineConfig({
  alias: {
    fd: "docs: \u4fee\u6b63\u6587\u6863\u4e2d\u7684\u9519\u522b\u5b57",
  },
  useEmoji: false,
  allowBreakingChanges: ["feat", "fix", "refactor"],
  allowCustomScopes: true,
  allowEmptyScopes: true,
  customScopesAlias: "\u81ea\u5b9a\u4e49\u8303\u56f4",
  emptyScopesAlias: "\u4e0d\u6307\u5b9a\u8303\u56f4",
  enableMultipleScopes: true,
  scopeEnumSeparator: ",",
  scopes: scopeOptions,
  scopesSearchValue: true,
  defaultType: "feat",
  issuePrefixes: [
    { value: "closed", name: "closed: \u5df2\u5b8c\u6210\u5e76\u5173\u95ed" },
    { value: "refs", name: "refs: \u4ec5\u5173\u8054\uff0c\u4e0d\u5173\u95ed" },
  ],
  customIssuePrefixAlias: "\u81ea\u5b9a\u4e49\u524d\u7f00",
  emptyIssuePrefixAlias: "\u8df3\u8fc7",
  messages: {
    type: "\u8bf7\u9009\u62e9\u63d0\u4ea4\u7c7b\u578b\uff1a",
    scope:
      "\u8bf7\u9009\u62e9\u5f71\u54cd\u8303\u56f4\uff08\u53ef\u591a\u9009\uff0c\u53ef\u8df3\u8fc7\uff09\uff1a",
    customScope:
      "\u8bf7\u8f93\u5165\u81ea\u5b9a\u4e49\u5f71\u54cd\u8303\u56f4\uff1a",
    subject:
      "\u8bf7\u586b\u5199\u7b80\u77ed\u7684\u63d0\u4ea4\u63cf\u8ff0\uff08\u5fc5\u586b\uff09\uff1a\n",
    body: '\u8bf7\u586b\u5199\u66f4\u8be6\u7ec6\u7684\u53d8\u66f4\u8bf4\u660e\uff08\u53ef\u9009\uff0c\u4f7f\u7528 "|" \u6362\u884c\uff09\uff1a\n',
    markBreaking:
      "\u662f\u5426\u5305\u542b\u7834\u574f\u6027\u53d8\u66f4\uff1f",
    breaking:
      '\u8bf7\u63cf\u8ff0\u7834\u574f\u6027\u53d8\u66f4\uff08\u53ef\u9009\uff0c\u4f7f\u7528 "|" \u6362\u884c\uff09\uff1a\n',
    footerPrefixesSelect:
      "\u8bf7\u9009\u62e9 Issue \u5173\u8054\u65b9\u5f0f\uff08\u53ef\u9009\uff09\uff1a",
    customFooterPrefix:
      "\u8bf7\u8f93\u5165\u81ea\u5b9a\u4e49 Issue \u524d\u7f00\uff1a",
    footer:
      "\u8bf7\u8f93\u5165\u5173\u8054\u7684 Issue\uff0c\u4f8b\u5982 #123\u3001#456\uff08\u53ef\u9009\uff09\uff1a\n",
    confirmCommit:
      "\u786e\u8ba4\u4f7f\u7528\u4ee5\u4e0a\u4fe1\u606f\u521b\u5efa\u63d0\u4ea4\u5417\uff1f",
  },
  types: commitTypes,
});
