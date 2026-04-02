export default function Logo({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="flex h-14 items-center border-b border-slate-100 px-3">
      <div className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-500 text-sm font-bold text-white">
        管
      </div>
      <div className="min-w-0 overflow-hidden transition-all">
        <div
          className={`text-sm font-semibold text-slate-800 ${collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}
        >
          运营后台
        </div>
        <div
          className={`text-xs text-slate-400 ${collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}
        >
          V1.0.0
        </div>
      </div>
    </div>
  )
}
