import { useEffect, useState } from 'react'
import { listRecords, listInvoices } from '../lib/db'

export default function Dashboard() {
  const [records, setRecords] = useState([])
  const [invoices, setInvoices] = useState([])

  useEffect(() => { (async () => {
    setRecords(await listRecords())
    setInvoices(await listInvoices())
  })() }, [])

  const totalPatients = new Set(records.map(r => (r.patient?.name||'')+ '|' + (r.owner?.name||''))).size
  const fatturato = invoices.reduce((s, f) => s + (f.totals?.totale || 0), 0)

  return (
    <div className="p-6">
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-slate-500 text-sm">Cartelle</div>
          <div className="text-2xl font-semibold">{records.length}</div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-slate-500 text-sm">Pazienti unici</div>
          <div className="text-2xl font-semibold">{totalPatients}</div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-slate-500 text-sm">Fatturato stimato</div>
          <div className="text-2xl font-semibold">€ {fatturato.toFixed(2)}</div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="text-slate-500 text-sm">Ultimo aggiornamento</div>
          <div className="text-2xl font-semibold">{new Date().toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  )
}
