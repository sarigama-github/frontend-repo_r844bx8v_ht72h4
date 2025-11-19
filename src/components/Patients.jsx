import { useEffect, useMemo, useState } from 'react'
import { listRecords } from '../lib/db'

export default function Patients() {
  const [records, setRecords] = useState([])
  const [q, setQ] = useState('')

  useEffect(() => { (async () => setRecords(await listRecords()))() }, [])

  const patients = useMemo(() => {
    const map = new Map()
    for (const r of records) {
      const key = `${r.patient?.name||''}|${r.owner?.name||''}`
      if (!map.has(key)) map.set(key, { name: r.patient?.name, owner: r.owner?.name, species: r.patient?.species, breed: r.patient?.breed })
    }
    return Array.from(map.values())
  }, [records])

  const filtered = patients.filter(p => (`${p.name} ${p.owner} ${p.species}`.toLowerCase()).includes(q.toLowerCase()))

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-slate-900 text-xl font-semibold">Pazienti</h2>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cerca paziente/proprietario/specie" className="px-3 py-2 rounded-md border border-slate-300 w-72" />
      </div>
      <div className="bg-white rounded-lg border border-slate-200 divide-y">
        {filtered.map((p, idx) => (
          <div key={idx} className="px-4 py-3 grid md:grid-cols-4 gap-2 text-slate-700">
            <div className="font-medium text-slate-900">{p.name}</div>
            <div>{p.owner}</div>
            <div>{p.species}</div>
            <div className="text-slate-500">{p.breed}</div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-slate-500 py-6 text-center">Nessun dato</p>
        )}
      </div>
    </div>
  )
}
