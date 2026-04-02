export const localeCodes = [
  'zh-CN',
  'en-US',
  'ja-JP',
  'ko-KR',
  'fr-FR',
  'de-DE',
  'es-ES',
  'pt-BR',
  'ru-RU',
] as const

export type LocaleCode = (typeof localeCodes)[number]

type AppLanguage = Locale.Language & {
  code: LocaleCode
}

export const languages: AppLanguage[] = [
  {
    code: 'zh-CN',
    name: '中文',
    nativeName: '简体中文',
    region: 'China',
    flag: '🇨🇳',
    antCode: 'zhCN',
    translateCode: 'zh-Hans',
  },
  {
    code: 'en-US',
    name: 'English',
    nativeName: 'English',
    region: 'United States',
    flag: '🇺🇸',
    antCode: 'enUS',
    translateCode: 'en',
  },
  {
    code: 'ja-JP',
    name: 'Japanese',
    nativeName: '日本語',
    region: 'Japan',
    flag: '🇯🇵',
    antCode: 'jaJP',
    translateCode: 'ja',
  },
  {
    code: 'ko-KR',
    name: 'Korean',
    nativeName: '한국어',
    region: 'Korea',
    flag: '🇰🇷',
    antCode: 'koKR',
    translateCode: 'ko',
  },
  {
    code: 'fr-FR',
    name: 'French',
    nativeName: 'Français',
    region: 'France',
    flag: '🇫🇷',
    antCode: 'frFR',
    translateCode: 'fr',
  },
  {
    code: 'de-DE',
    name: 'German',
    nativeName: 'Deutsch',
    region: 'Germany',
    flag: '🇩🇪',
    antCode: 'deDE',
    translateCode: 'de',
  },
  {
    code: 'es-ES',
    name: 'Spanish',
    nativeName: 'Español',
    region: 'Spain',
    flag: '🇪🇸',
    antCode: 'esES',
    translateCode: 'es',
  },
  {
    code: 'pt-BR',
    name: 'Portuguese',
    nativeName: 'Português',
    region: 'Brazil',
    flag: '🇧🇷',
    antCode: 'ptBR',
    translateCode: 'pt',
  },
  {
    code: 'ru-RU',
    name: 'Russian',
    nativeName: 'Русский',
    region: 'Russia',
    flag: '🇷🇺',
    antCode: 'ruRU',
    translateCode: 'ru',
  },
]

export const defaultLocale: LocaleCode = 'zh-CN'

export const localeOptions = languages.map((item) => ({
  label: item.flag
    ? `${item.flag} ${item.nativeName ?? item.name}`
    : (item.nativeName ?? item.name),
  value: item.code,
}))

export const localeCodeSet = new Set<LocaleCode>(languages.map((item) => item.code))
