import { useEffect, useState } from 'react'
import { listRecords } from '../lib/db'

export default function RecordList() {
  const [records, setRecords] = useState([])
  const [q, setQ] = useState('')

  useEffect(() => { (async () => setRecords(await listRecords()))() }, [])

  const filtered = records.filter(r => (
    `${r?.owner?.name||''} ${r?.patient?.name||''} ${r?.patient?.species||''}`.toLowerCase().includes(q.toLowerCase())
  ))

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-slate-900 text-xl font-semibold">Cartelle Cliniche</h2>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cerca" className="px-3 py-2 rounded-md border border-slate-300 w-72" />
      </div>
      <div className="bg-white rounded-lg border border-slate-200 divide-y">
        {filtered.map(r => (
          <div key={r.id} className="px-4 py-3 grid md:grid-cols-4 gap-2 text-slate-700">
            <div className="font-medium text-slate-900">{r?.patient?.name || '-'}</div>
            <div>{r?.owner?.name || '-'}</div>
            <div>{r?.patient?.species || ''} {r?.patient?.breed || ''}</div>
            <div className="text-slate-500">{new Date(r?.createdAt||Date.now()).toLocaleString()}</div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-slate-500 py-6 text-center">Nessun risultato</p>
        )}
      </div>
    </div>
  )
}
