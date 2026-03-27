const LEVEL_ERROR = 2;
const LEVEL_WARNING = 1;
const LEVEL_OFF = 0;
const HEADER_MAX_LENGTH = 200;

const TYPE_ENUM = [
  "build",
  "chore",
  "ci",
  "docs",
  "feat",
  "fix",
  "perf",
  "refactor",
  "release",
  "revert",
  "style",
  "test",
  "types",
  "wip",
  "workflow",
];

/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  ignores: [(commit) => commit.includes("init")],
  rules: {
    "body-leading-blank": [LEVEL_ERROR, "always"],
    "footer-leading-blank": [LEVEL_WARNING, "always"],
    "header-max-length": [LEVEL_ERROR, "always", HEADER_MAX_LENGTH],
    "subject-case": [LEVEL_OFF],
    "subject-empty": [LEVEL_ERROR, "never"],
    "type-empty": [LEVEL_ERROR, "never"],
    "type-enum": [LEVEL_ERROR, "always", TYPE_ENUM],
  },
  prompt: {
    questions: {
      type: {
        description: "请选择本次提交类型",
        enum: {
          feat: { description: "新增功能", title: "功能", emoji: "✨" },
          fix: { description: "修复缺陷", title: "修复", emoji: "🐛" },
          docs: { description: "仅文档变更", title: "文档", emoji: "📝" },
          style: {
            description: "代码格式调整（不影响逻辑）",
            title: "样式",
            emoji: "💄",
          },
          refactor: { description: "代码重构", title: "重构", emoji: "♻️" },
          perf: { description: "性能优化", title: "性能", emoji: "⚡" },
          test: { description: "测试相关变更", title: "测试", emoji: "✅" },
          build: {
            description: "构建流程或依赖变更",
            title: "构建",
            emoji: "📦",
          },
          ci: { description: "CI 配置或脚本变更", title: "CI", emoji: "🎡" },
          chore: { description: "杂项维护", title: "杂项", emoji: "🔧" },
          release: {
            description: "发布流程或版本变更",
            title: "发布",
            emoji: "🚀",
          },
          types: { description: "类型定义变更", title: "类型", emoji: "🧠" },
          wip: { description: "阶段性提交", title: "进行中", emoji: "🚧" },
          workflow: {
            description: "工作流或自动化变更",
            title: "工作流",
            emoji: "🧩",
          },
          revert: { description: "回滚提交", title: "回滚", emoji: "⏪" },
        },
      },
      scope: { description: "请选择影响范围（可选）" },
      subject: { description: "请填写简短描述（必填）" },
      body: { description: "请填写详细说明（可选）" },
      isBreaking: { description: "是否有破坏性变更？" },
      breakingBody: { description: "请填写破坏性变更的详细说明（必填）" },
      breaking: { description: "请描述破坏性变更（可选）" },
      isIssueAffected: { description: "是否关联 Issue？" },
      issuesBody: { description: "请填写 Issue 关联说明（必填）" },
      issues: { description: "请输入 Issue（如：#123）" },
    },
    useEmoji: false,
  },
};
