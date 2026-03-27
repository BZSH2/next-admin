/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "../../.next/dev/types/routes.d.ts";

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_URL: `http://${string}` | `https://${string}`;
  }
}

// NOTE: This file should not be edited manually unless you understand
// Next.js generated type references and project-specific env typing needs.
