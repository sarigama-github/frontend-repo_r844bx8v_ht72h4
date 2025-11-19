import { useMemo, useState } from 'react'
import { addInvoice, listInvoices } from '../lib/db'

function calcTotals(rows) {
  const imponibile = rows.reduce((s, r) => s + (parseFloat(r.price||0) * (parseFloat(r.qty||1) || 1)), 0)
  const iva = imponibile * 0.22
  const cassa = imponibile * 0.02
  const totale = imponibile + iva + cassa
  return { imponibile, iva, cassa, totale }
}

export default function Invoice() {
  const [customer, setCustomer] = useState({ name: '', cf: '', address: '' })
  const [rows, setRows] = useState([{ desc: '', qty: 1, price: 0 }])
  const [saved, setSaved] = useState([])

  const totals = useMemo(() => calcTotals(rows), [rows])

  function addRow() { setRows([...rows, { desc: '', qty: 1, price: 0 }]) }

  async function save() {
    const id = await addInvoice({ customer, rows, totals })
    const list = await listInvoices()
    setSaved(list)
    alert('Fattura salvata (offline). ID: ' + id)
  }

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6">
      <h2 className="text-white text-xl font-semibold mb-4">Emissione Fattura</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <section>
          <h3 className="text-slate-200 font-medium mb-2">Dati cliente</h3>
          <div className="grid gap-2">
            <input className="px-3 py-2 rounded bg-slate-900 text-white border border-slate-700" placeholder="Nome / Ragione sociale" value={customer.name} onChange={e=>setCustomer({...customer,name:e.target.value})} />
            <input className="px-3 py-2 rounded bg-slate-900 text-white border border-slate-700" placeholder="CF / P.IVA" value={customer.cf} onChange={e=>setCustomer({...customer,cf:e.target.value})} />
            <input className="px-3 py-2 rounded bg-slate-900 text-white border border-slate-700" placeholder="Indirizzo" value={customer.address} onChange={e=>setCustomer({...customer,address:e.target.value})} />
          </div>
        </section>
        <section>
          <h3 className="text-slate-200 font-medium mb-2">Righe</h3>
          <div className="space-y-2">
            {rows.map((r, idx) => (
              <div key={idx} className="grid grid-cols-7 gap-2 items-center">
                <input className="col-span-3 px-3 py-2 rounded bg-slate-900 text-white border border-slate-700" placeholder="Descrizione" value={r.desc} onChange={e=>{ const arr=[...rows]; arr[idx]={...r,desc:e.target.value}; setRows(arr) }} />
                <input type="number" className="col-span-2 px-3 py-2 rounded bg-slate-900 text-white border border-slate-700" placeholder="Quantità" value={r.qty} onChange={e=>{ const arr=[...rows]; arr[idx]={...r,qty:e.target.value}; setRows(arr) }} />
                <input type="number" className="col-span-2 px-3 py-2 rounded bg-slate-900 text-white border border-slate-700" placeholder="Prezzo" value={r.price} onChange={e=>{ const arr=[...rows]; arr[idx]={...r,price:e.target.value}; setRows(arr) }} />
              </div>
            ))}
            <button className="text-sm px-3 py-1 rounded bg-slate-700 text-white" onClick={addRow}>Aggiungi riga</button>
          </div>
        </section>
      </div>

      <div className="mt-6 grid md:grid-cols-4 gap-3 text-white">
        <div className="bg-slate-900 p-3 rounded border border-slate-700">Imponibile: € {totals.imponibile.toFixed(2)}</div>
        <div className="bg-slate-900 p-3 rounded border border-slate-700">IVA 22%: € {totals.iva.toFixed(2)}</div>
        <div className="bg-slate-900 p-3 rounded border border-slate-700">Cassa 2%: € {totals.cassa.toFixed(2)}</div>
        <div className="bg-slate-900 p-3 rounded border border-slate-700 font-semibold">Totale: € {totals.totale.toFixed(2)}</div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button onClick={save} className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white">Salva fattura (offline)</button>
      </div>

      {saved.length > 0 && (
        <div className="mt-6">
          <h3 className="text-slate-200 font-medium mb-2">Fatture salvate</h3>
          <div className="text-slate-300 text-sm space-y-1">
            {saved.map(f => (
              <div key={f.id} className="flex items-center justify-between bg-slate-900 border border-slate-700 rounded px-3 py-2">
                <span>{f.customer?.name || 'Cliente'} • € {f.totals?.totale?.toFixed(2)}</span>
                <span className="text-slate-400">{new Date(f.createdAt).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
