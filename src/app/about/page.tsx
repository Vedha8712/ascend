const integrations = [
  { name: 'Google Calendar', type: 'OAuth + sync', status: 'Not connected', description: 'Sync academic and personal calendar events to your school schedule.' },
  { name: 'Google Tasks', type: 'OAuth + sync', status: 'Not connected', description: 'Create tasks in Ascend and push eligible items to Google Tasks.' },
  { name: 'Notion', type: 'Embed + export', status: 'Available', description: 'Attach notes and dashboards as exported pages or links.' },
  { name: 'Anki', type: 'Import/export', status: 'Available', description: 'Move flashcards into a compatible deck format for spaced repetition.' },
  { name: 'YouTube', type: 'Link + embed', status: 'Available', description: 'Attach video lectures and revision playlists to subjects and tasks.' },
  { name: 'Spotify', type: 'Link', status: 'Available', description: 'Support a study playlist or focus soundtrack library.' },
];

export default function ConnectedAppsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-orange-500">Connected apps</p>
        <h1 className="text-3xl font-black text-slate-900">Integrations and sync status</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {integrations.map((item) => (
          <div key={item.name} className="card p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-slate-900">{item.name}</h2>
              <span className="badge">{item.status}</span>
            </div>
            <p className="mt-3 text-sm uppercase tracking-[0.15em] text-orange-500">{item.type}</p>
            <p className="mt-3 text-sm text-slate-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
