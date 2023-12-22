// update: 更新代码 | Update code
// fix: 修复 bug | Fix bug
// feat: 新功能 | New feature
// chore: 构建过程或辅助工具的变动 | Build process or auxiliary tool changes
// docs: 文档 | Documentation
// refactor: 重构（即不是新增功能，也不是修改 bug 的代码变动） | Refactor (i.e. code changes that are neither new features nor bug fixes)
// test: 增加测试 | Add test
// style: 代码格式（不影响功能，例如空格、分号等格式修正） | Code format (no functional impact, such as space, semicolon, etc.)
// version: 更新迭代 package.json 版本号 | Update the package.json version number
// build: 构建 | Build
// plugin: 更新插件版本 | Update plugin version

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'bug',
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'style',
        'version',
        'build',
        'plugin',
      ],
    ],
  },
}
