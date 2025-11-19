import { useEffect, useMemo, useState } from 'react'
import { listRecords, listInvoices } from '../lib/db'

export default function Analytics() {
  const [records, setRecords] = useState([])
  const [invoices, setInvoices] = useState([])

  useEffect(() => { (async () => {
    setRecords(await listRecords())
    setInvoices(await listInvoices())
  })() }, [])

  const stats = useMemo(() => {
    const totalPatients = new Set(records.map(r => (r.patient?.name||'')+ '|' + (r.owner?.name||''))).size
    const bySpecies = records.reduce((acc, r) => {
      const s = (r.patient?.species || 'N/D')
      acc[s] = (acc[s]||0)+1
      return acc
    }, {})
    const fatturato = invoices.reduce((s, f) => s + (f.totals?.totale || 0), 0)
    return { totalRecords: records.length, totalPatients, bySpecies, fatturato }
  }, [records, invoices])

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 text-white">
      <h2 className="text-xl font-semibold mb-4">Analisi Dati</h2>
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-4 rounded border border-slate-700">
          <div className="text-slate-400 text-sm">Cartelle</div>
          <div className="text-2xl font-bold">{stats.totalRecords}</div>
        </div>
        <div className="bg-slate-900 p-4 rounded border border-slate-700">
          <div className="text-slate-400 text-sm">Pazienti unici</div>
          <div className="text-2xl font-bold">{stats.totalPatients}</div>
        </div>
        <div className="bg-slate-900 p-4 rounded border border-slate-700">
          <div className="text-slate-400 text-sm">Fatturato (offline)</div>
          <div className="text-2xl font-bold">€ {stats.fatturato.toFixed(2)}</div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-slate-200 font-medium mb-2">Distribuzione per specie</h3>
        <div className="grid md:grid-cols-4 gap-2 text-sm">
          {Object.entries(stats.bySpecies).map(([k,v]) => (
            <div key={k} className="bg-slate-900 p-3 rounded border border-slate-700 flex items-center justify-between">
              <span>{k}</span>
              <span className="text-slate-400">{v}</span>
            </div>
          ))}
          {Object.keys(stats.bySpecies).length === 0 && (
            <p className="text-slate-400">Nessun dato disponibile</p>
          )}
        </div>
      </div>
    </div>
  )
}
