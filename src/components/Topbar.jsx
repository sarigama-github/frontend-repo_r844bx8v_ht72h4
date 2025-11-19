export default function Topbar({ title, subtitle, actions }) {
  return (
    <div className="px-6 py-4 border-b border-slate-200 bg-white sticky top-0 z-10">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">{actions}</div>
      </div>
    </div>
  )
}
