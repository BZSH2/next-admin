declare global {
  namespace Cookie {
    interface Schema {
      NEXT_LOCALE: Locale.Code
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
