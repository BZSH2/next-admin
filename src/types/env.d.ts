declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_URL: `http://${string}` | `https://${string}`;
  }
}

declare module '*.svg' {
  import type { ComponentType, SVGProps } from 'react';

  const ReactComponent: ComponentType<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
