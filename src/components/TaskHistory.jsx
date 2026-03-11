function TaskHistory({ truthHistory, dareHistory }) {
  const entries = [
    ...truthHistory.map((h) => ({ ...h, type: "Truth" })),
    ...dareHistory.map((h) => ({ ...h, type: "Dare" })),
  ]
    .sort((a, b) => b.at - a.at)
    .slice(0, 5);

  return (
    <section
      className="mt-5 rounded-2xl border border-teal-100/20 bg-slate-900/35 p-4"
      aria-label="Recent tasks"
    >
      <h3 className="mb-2 font-display text-lg">Recent Tasks</h3>
      {entries.length === 0 ? (
        <p className="text-sm text-slate-300/75">No tasks yet.</p>
      ) : (
        <ul className="space-y-2 text-sm text-slate-100/90">
          {entries.map((entry) => (
            <li
              key={`${entry.type}-${entry.at}`}
              className="rounded-lg border border-slate-100/10 bg-slate-950/40 px-3 py-2"
            >
              <span className="mr-2 rounded-full bg-slate-100/15 px-2 py-0.5 text-xs">
                {entry.type}
              </span>
              {entry.task}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TaskHistory;
