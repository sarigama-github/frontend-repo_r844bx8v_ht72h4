import { useState } from 'react'

const NavButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      active ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
    }`}
  >
    {children}
  </button>
)

export default function Sidebar({ current, onNavigate }) {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <aside className={`h-screen border-r border-slate-200 bg-white ${collapsed ? 'w-16' : 'w-64'} transition-all sticky top-0`}> 
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/flame-icon.svg" alt="Logo" className="w-7 h-7" />
          {!collapsed && <span className="text-slate-900 font-semibold">Vet Offline</span>}
        </div>
        <button className="text-slate-500" onClick={() => setCollapsed(v => !v)}>{collapsed ? '>' : '<'}</button>
      </div>
      <div className="px-2 space-y-1">
        <NavButton active={current==='dashboard'} onClick={() => onNavigate('dashboard')}>Dashboard</NavButton>
        <NavButton active={current==='records'} onClick={() => onNavigate('records')}>Cartelle</NavButton>
        <NavButton active={current==='new'} onClick={() => onNavigate('new')}>Nuova cartella</NavButton>
        <NavButton active={current==='patients'} onClick={() => onNavigate('patients')}>Pazienti</NavButton>
        <NavButton active={current==='owners'} onClick={() => onNavigate('owners')}>Proprietari</NavButton>
        <NavButton active={current==='invoice'} onClick={() => onNavigate('invoice')}>Fatture</NavButton>
        <NavButton active={current==='analysis'} onClick={() => onNavigate('analysis')}>Analisi</NavButton>
        <div className="pt-2 mt-2 border-t border-slate-200" />
        <NavButton active={current==='settings'} onClick={() => onNavigate('settings')}>Impostazioni</NavButton>
      </div>
    </aside>
  )
}
