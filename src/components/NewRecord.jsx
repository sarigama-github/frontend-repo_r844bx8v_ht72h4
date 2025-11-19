import { useState } from 'react'
import { addRecord } from '../lib/db'

const initialOwner = { name: '', phone: '', email: '' }
const initialPatient = { name: '', species: '', breed: '', age: '' }

export default function NewRecord({ onSaved }) {
  const [owner, setOwner] = useState(initialOwner)
  const [patient, setPatient] = useState(initialPatient)
  const [notes, setNotes] = useState('')
  const [images, setImages] = useState([])
  const [labs, setLabs] = useState([])
  const [saving, setSaving] = useState(false)

  const handleAddLab = () => {
    setLabs([...labs, { test: '', value: '', unit: '', ref: '', suggestion: '' }])
  }
  const handleAddImage = () => {
    setImages([...images, { type: '', url: '', notes: '' }])
  }

  const interpretLab = (test, value) => {
    if (!value) return ''
    const v = parseFloat(value)
    if (isNaN(v)) return ''
    // semplici suggerimenti dimostrativi
    if (/emocromo/i.test(test)) {
      if (v < 4) return 'Possibile anemia, considerare reticolociti.'
      if (v > 8) return 'Possibile policitemia, valutare idratazione.'
    }
    if (/glucos/i.test(test)) {
      if (v > 120) return 'Iperglicemia: valutare diabete o stress.'
      if (v < 70) return 'Ipoglicemia: valutare digiuno/problemi epatici.'
    }
    return ''
  }

  const save = async () => {
    setSaving(true)
    try {
      const preparedLabs = labs.map(l => ({ ...l, suggestion: l.suggestion || interpretLab(l.test, l.value) }))
      const id = await addRecord({ owner, patient, notes, images, labs: preparedLabs })
      onSaved && onSaved(id)
      setOwner(initialOwner)
      setPatient(initialPatient)
      setNotes('')
      setImages([])
      setLabs([])
    } catch (e) {
      alert('Errore nel salvataggio: ' + e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6">
      <h2 className="text-white text-xl font-semibold mb-4">Nuova Cartella Clinica</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <section>
          <h3 className="text-slate-200 font-medium mb-2">Proprietario</h3>
          <div className="grid gap-2">
            <input className="px-3 py-2 rounded bg-slate-900 text-white border border-slate-700" placeholder="Nome" value={owner.name} onChange={e=>setOwner({...owner,name:e.target.value})} />
            <input className="px-3 py-2 rounded bg-slate-900 text-white border border-slate-700" placeholder="Telefono" value={owner.phone} onChange={e=>setOwner({...owner,phone:e.target.value})} />
            <input className="px-3 py-2 rounded bg-slate-900 text-white border border-slate-700" placeholder="Email" value={owner.email} onChange={e=>setOwner({...owner,email:e.target.value})} />
          </div>
        </section>

        <section>
          <h3 className="text-slate-200 font-medium mb-2">Paziente</h3>
          <div className="grid gap-2">
            <input className="px-3 py-2 rounded bg-slate-900 text-white border border-slate-700" placeholder="Nome" value={patient.name} onChange={e=>setPatient({...patient,name:e.target.value})} />
            <input className="px-3 py-2 rounded bg-slate-900 text-white border border-slate-700" placeholder="Specie" value={patient.species} onChange={e=>setPatient({...patient,species:e.target.value})} />
            <input className="px-3 py-2 rounded bg-slate-900 text-white border border-slate-700" placeholder="Razza" value={patient.breed} onChange={e=>setPatient({...patient,breed:e.target.value})} />
            <input className="px-3 py-2 rounded bg-slate-900 text-white border border-slate-700" placeholder="Età" value={patient.age} onChange={e=>setPatient({...patient,age:e.target.value})} />
          </div>
        </section>
      </div>

      <div className="mt-6">
        <h3 className="text-slate-200 font-medium mb-2">Note cliniche</h3>
        <textarea className="w-full min-h-[100px] px-3 py-2 rounded bg-slate-900 text-white border border-slate-700" placeholder="Anamnesi, esame obiettivo, terapie..." value={notes} onChange={e=>setNotes(e.target.value)} />
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-200 font-medium">Diagnostica per immagini</h3>
            <button className="text-sm px-3 py-1 rounded bg-slate-700 text-white" onClick={handleAddImage}>Aggiungi</button>
          </div>
          <div className="grid gap-3">
            {images.map((img, idx) => (
              <div key={idx} className="grid gap-2 bg-slate-900 p-3 rounded border border-slate-700">
                <input className="px-3 py-2 rounded bg-slate-950 text-white border border-slate-800" placeholder="Tipo (RX, ECO, TAC...)" value={img.type} onChange={e=>{
                  const arr=[...images]; arr[idx]={...img,type:e.target.value}; setImages(arr)
                }} />
                <input className="px-3 py-2 rounded bg-slate-950 text-white border border-slate-800" placeholder="URL immagine (facoltativa)" value={img.url} onChange={e=>{
                  const arr=[...images]; arr[idx]={...img,url:e.target.value}; setImages(arr)
                }} />
                <input className="px-3 py-2 rounded bg-slate-950 text-white border border-slate-800" placeholder="Note" value={img.notes} onChange={e=>{
                  const arr=[...images]; arr[idx]={...img,notes:e.target.value}; setImages(arr)
                }} />
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-200 font-medium">Diagnostica di laboratorio</h3>
            <button className="text-sm px-3 py-1 rounded bg-slate-700 text-white" onClick={handleAddLab}>Aggiungi</button>
          </div>
          <div className="grid gap-3">
            {labs.map((lab, idx) => (
              <div key={idx} className="grid gap-2 bg-slate-900 p-3 rounded border border-slate-700">
                <input className="px-3 py-2 rounded bg-slate-950 text-white border border-slate-800" placeholder="Esame (es. Glucosio, Emocromo)" value={lab.test} onChange={e=>{
                  const arr=[...labs]; arr[idx]={...lab,test:e.target.value}; setLabs(arr)
                }} />
                <div className="grid grid-cols-3 gap-2">
                  <input className="px-3 py-2 rounded bg-slate-950 text-white border border-slate-800" placeholder="Valore" value={lab.value} onChange={e=>{
                    const arr=[...labs]; arr[idx]={...lab,value:e.target.value}; setLabs(arr)
                  }} />
                  <input className="px-3 py-2 rounded bg-slate-950 text-white border border-slate-800" placeholder="Unità" value={lab.unit} onChange={e=>{
                    const arr=[...labs]; arr[idx]={...lab,unit:e.target.value}; setLabs(arr)
                  }} />
                  <input className="px-3 py-2 rounded bg-slate-950 text-white border border-slate-800" placeholder="Range di riferimento" value={lab.ref} onChange={e=>{
                    const arr=[...labs]; arr[idx]={...lab,ref:e.target.value}; setLabs(arr)
                  }} />
                </div>
                <textarea className="px-3 py-2 rounded bg-slate-950 text-white border border-slate-800" placeholder="Suggerimenti di interpretazione" value={lab.suggestion || interpretLab(lab.test, lab.value)} onChange={e=>{
                  const arr=[...labs]; arr[idx]={...lab,suggestion:e.target.value}; setLabs(arr)
                }} />
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button disabled={saving} onClick={save} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white">{saving ? 'Salvataggio...' : 'Salva cartella'}</button>
      </div>
    </div>
  )
}
