export default function Logo({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="h-44px flex items-center justify-center font-bold">
      {collapsed ? 'NA' : 'Next Admin'}
    </div>
  )
}
