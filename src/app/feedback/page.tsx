export default function FeedbackPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-orange-500">Feedback</p>
        <h1 className="text-3xl font-black text-slate-900">Share ideas and report issues</h1>
      </div>

      <form className="card p-6 space-y-4">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Type</label>
          <select className="input" name="type">
            <option value="suggestion">Suggestion</option>
            <option value="bug">Bug report</option>
            <option value="feature">Feature request</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Title</label>
          <input className="input" name="title" placeholder="Short summary" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Message</label>
          <textarea className="input" rows={5} name="message" placeholder="Tell us what is working, what is missing, or what needs fixing." />
        </div>
        <button className="btn-primary" type="submit">Submit feedback</button>
      </form>
    </div>
  );
}
