export default function VolunteerPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-orange-500">Volunteer portal</p>
        <h1 className="text-3xl font-black text-slate-900">Collaborate with the Ascend community</h1>
      </div>

      <div className="card p-6 space-y-4">
        <p className="text-slate-600">
          We welcome students and volunteers who want to help with research, community support, accessibility, and product feedback.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-orange-50 p-4">
            <p className="text-sm uppercase tracking-[0.15em] text-orange-500">Available roles</p>
            <ul className="mt-3 list-disc pl-5 text-sm text-slate-700">
              <li>Accessibility review</li>
              <li>Student research</li>
              <li>Content edits</li>
              <li>Community support</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm uppercase tracking-[0.15em] text-orange-500">Application</p>
            <p className="mt-3 text-sm text-slate-700">Send your interest, skills, availability, and a brief background summary.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
