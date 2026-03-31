'use client';

import Layouts from './Layouts';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <Layouts>{children}</Layouts>;
}
