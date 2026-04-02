import path from 'node:path'
import { fileURLToPath } from 'node:url'

const cwd = fileURLToPath(new URL('.', import.meta.url))

const toCliArgs = (filenames) =>
  filenames
    .map((filename) => path.relative(cwd, filename).split(path.sep).join('/'))
    .map((filename) => `"${filename}"`)
    .join(' ')

const buildCommand = (baseCommand) => (filenames) => `${baseCommand} ${toCliArgs(filenames)}`

const isTypeDeclarationFile = (filename) => filename.endsWith('.d.ts')
const isConfigFile = (filename) => {
  const normalizedFilename = filename.split(path.sep).join('/')
  const basename = path.basename(filename)

  return /\.(config|rc)\.[cm]?[jt]s$/i.test(normalizedFilename) || basename.startsWith('.')
}

const buildEslintCommand = (filenames) => {
  const lintableFiles = filenames.filter(
    (filename) => !isTypeDeclarationFile(filename) && !isConfigFile(filename)
  )

  if (lintableFiles.length === 0) {
    return 'echo "No files for ESLint"'
  }

  return `eslint --fix --max-warnings=0 ${toCliArgs(lintableFiles)}`
}

const lintStagedConfig = {
  '*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}': [buildEslintCommand, buildCommand('prettier --write')],
  '*.{css,scss}': [
    buildCommand('stylelint --fix --allow-empty-input'),
    buildCommand('prettier --write'),
  ],
  '*.{json,md,mdx}': [buildCommand('prettier --write')],
  '*.{yml,yaml}': [buildCommand('prettier --write')],
}

export default lintStagedConfig
