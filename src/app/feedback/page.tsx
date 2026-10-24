const resources = [
  { title: 'Active recall guides', category: 'Study methods', tags: ['memory', 'retention'] },
  { title: 'Healthy timetable templates', category: 'Planning', tags: ['routine', 'wellbeing'] },
  { title: 'Exam preparation checklist', category: 'Academic', tags: ['revision', 'confidence'] },
  { title: 'Reflection prompts', category: 'Wellbeing', tags: ['journaling', 'self-check'] },
];

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-orange-500">Resources</p>
        <h1 className="text-3xl font-black text-slate-900">Study resources and opportunities</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {resources.map((resource) => (
          <div key={resource.title} className="card p-5">
            <p className="text-sm uppercase tracking-[0.15em] text-orange-500">{resource.category}</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">{resource.title}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {resource.tags.map((tag) => (
                <span key={tag} className="badge">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
