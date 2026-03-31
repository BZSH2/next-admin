declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_URL: `http://${string}` | `https://${string}`;
  }
}
