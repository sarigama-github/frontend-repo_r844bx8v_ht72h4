import { useState } from 'react'

export default function Header({ onNavigate }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-20 bg-slate-900/80 backdrop-blur border-b border-slate-700">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/flame-icon.svg" alt="Logo" className="w-8 h-8" />
          <span className="text-white font-semibold">Gestionale Offline</span>
        </div>
        <nav className="hidden md:flex items-center gap-2">
          <button onClick={() => onNavigate('new')} className="px-3 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white text-sm">Nuova Cartella</button>
          <button onClick={() => onNavigate('patients')} className="px-3 py-2 rounded bg-slate-700 hover:bg-slate-600 text-white text-sm">Pazienti</button>
          <button onClick={() => onNavigate('owners')} className="px-3 py-2 rounded bg-slate-700 hover:bg-slate-600 text-white text-sm">Proprietari</button>
          <button onClick={() => onNavigate('analysis')} className="px-3 py-2 rounded bg-slate-700 hover:bg-slate-600 text-white text-sm">Analisi Dati</button>
          <button onClick={() => onNavigate('invoice')} className="px-3 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-sm">Fattura</button>
        </nav>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>Menu</button>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-4 grid gap-2">
          <button onClick={() => onNavigate('new')} className="px-3 py-2 rounded bg-blue-600 text-white text-sm">Nuova Cartella</button>
          <button onClick={() => onNavigate('patients')} className="px-3 py-2 rounded bg-slate-700 text-white text-sm">Pazienti</button>
          <button onClick={() => onNavigate('owners')} className="px-3 py-2 rounded bg-slate-700 text-white text-sm">Proprietari</button>
          <button onClick={() => onNavigate('analysis')} className="px-3 py-2 rounded bg-slate-700 text-white text-sm">Analisi Dati</button>
          <button onClick={() => onNavigate('invoice')} className="px-3 py-2 rounded bg-emerald-600 text-white text-sm">Fattura</button>
        </div>
      )}
    </header>
  )
}
