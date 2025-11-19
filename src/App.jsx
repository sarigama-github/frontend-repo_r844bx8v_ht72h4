import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './components/Dashboard'
import NewRecord from './components/NewRecord'
import RecordList from './components/RecordList'
import Patients from './components/Patients'
import Owners from './components/Owners'
import Invoice from './components/Invoice'
import Analytics from './components/Analytics'

function App() {
  const [view, setView] = useState('dashboard')

  const titles = {
    dashboard: { title: 'Dashboard', subtitle: 'Panoramica rapida della tua clinica' },
    records: { title: 'Cartelle Cliniche', subtitle: 'Tutte le cartelle salvate' },
    new: { title: 'Nuova Cartella', subtitle: 'Crea una nuova cartella clinica' },
    patients: { title: 'Pazienti', subtitle: 'Elenco pazienti deduplicato' },
    owners: { title: 'Proprietari', subtitle: 'Rubrica proprietari' },
    invoice: { title: 'Fatture', subtitle: 'Crea ed elenca fatture offline' },
    analysis: { title: 'Analisi', subtitle: 'Statistiche e indicatori chiave' },
    settings: { title: 'Impostazioni', subtitle: 'Preferenze locali' }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      <Sidebar current={view} onNavigate={setView} />
      <div className="flex-1 min-w-0">
        <Topbar title={titles[view]?.title} subtitle={titles[view]?.subtitle} />
        <main className="max-w-6xl mx-auto px-6 py-6">
          {view === 'dashboard' && <Dashboard />}
          {view === 'records' && <RecordList />}
          {view === 'new' && <NewRecord onSaved={() => setView('records')} />}
          {view === 'patients' && <Patients />}
          {view === 'owners' && <Owners />}
          {view === 'analysis' && <Analytics />}
          {view === 'invoice' && <Invoice />}
        </main>
      </div>
    </div>
  )
}

export default App
