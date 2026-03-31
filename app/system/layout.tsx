import AdminLayout from '@/components/AdminLayout';

export default function SystemLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
