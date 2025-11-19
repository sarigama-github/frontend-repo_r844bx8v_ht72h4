import { useEffect, useMemo, useState } from 'react'
import { listRecords } from '../lib/db'

export default function Owners() {
  const [records, setRecords] = useState([])
  const [q, setQ] = useState('')

  useEffect(() => { (async () => setRecords(await listRecords()))() }, [])

  const owners = useMemo(() => {
    const map = new Map()
    for (const r of records) {
      const key = `${r.owner?.name||''}|${r.owner?.phone||''}`
      if (!map.has(key)) map.set(key, { name: r.owner?.name, phone: r.owner?.phone, email: r.owner?.email })
    }
    return Array.from(map.values())
  }, [records])

  const filtered = owners.filter(o => (`${o.name} ${o.phone} ${o.email}`.toLowerCase()).includes(q.toLowerCase()))

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-slate-900 text-xl font-semibold">Proprietari</h2>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cerca nome/telefono/email" className="px-3 py-2 rounded-md border border-slate-300 w-72" />
      </div>
      <div className="bg-white rounded-lg border border-slate-200 divide-y">
        {filtered.map((o, idx) => (
          <div key={idx} className="px-4 py-3 grid md:grid-cols-3 gap-2 text-slate-700">
            <div className="font-medium text-slate-900">{o.name}</div>
            <div>{o.phone}</div>
            <div className="text-slate-500">{o.email}</div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-slate-500 py-6 text-center">Nessun dato</p>
        )}
      </div>
    </div>
  )
}
