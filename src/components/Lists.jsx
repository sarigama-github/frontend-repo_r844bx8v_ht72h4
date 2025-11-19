import { useEffect, useState } from 'react'
import { listRecords } from '../lib/db'

export default function Lists() {
  const [records, setRecords] = useState([])
  const [q, setQ] = useState('')

  useEffect(() => { load() }, [])

  async function load() {
    const all = await listRecords()
    setRecords(all)
  }

  const filtered = records.filter(r => {
    const s = `${r?.owner?.name||''} ${r?.patient?.name||''}`.toLowerCase()
    return s.includes(q.toLowerCase())
  })

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-xl font-semibold">Cartelle salvate</h2>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cerca per proprietario o paziente" className="px-3 py-2 rounded bg-slate-900 text-white border border-slate-700 w-64" />
      </div>

      <div className="divide-y divide-slate-700">
        {filtered.map(r => (
          <div key={r.id} className="py-3 grid md:grid-cols-3 gap-2 text-slate-200">
            <div>
              <div className="text-slate-100 font-medium">{r?.owner?.name || '-'} • {r?.patient?.name || '-'}</div>
              <div className="text-sm text-slate-400">{r?.patient?.species || ''} {r?.patient?.breed || ''}</div>
            </div>
            <div className="text-sm text-slate-400">{r?.notes?.slice(0,80)}</div>
            <div className="text-sm text-slate-400">{new Date(r?.createdAt||Date.now()).toLocaleString()}</div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-slate-400 py-6 text-center">Nessun risultato</p>
        )}
      </div>
    </div>
  )
}
