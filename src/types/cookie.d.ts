declare global {
  namespace Cookie {
    type ExtractShortCode<T extends string> = T extends `${infer S}-${string}` ? S : T

    type LocaleCode = ExtractShortCode<Locale.Code>

    interface Schema {
      NEXT_LOCALE: LocaleCode
    }

    type Key = keyof Schema
    type Value<K extends Key = Key> = Schema[K]

    interface Attributes {
      path?: string
      domain?: string
      expires?: Date
      maxAge?: number
      secure?: boolean
      sameSite?: 'strict' | 'lax' | 'none'
    }
  }
}

export {}
