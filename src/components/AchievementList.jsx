import clsx from "clsx";
import { Award } from "lucide-react";

const labels = {
  firstTruth: "First Truth",
  firstDare: "First Dare",
  fiveTasks: "5 Tasks Completed",
  tenTasks: "10 Tasks Completed",
};

function AchievementList({ unlocked }) {
  const all = Object.keys(labels);

  return (
    <section
      className="mt-5 rounded-2xl border border-teal-100/20 bg-slate-900/35 p-4"
      aria-label="Achievements"
    >
      <h3 className="mb-3 flex items-center gap-2 font-display text-lg">
        <Award size={18} className="text-amber-300" />
        Achievements
      </h3>
      <div className="grid gap-2 sm:grid-cols-2">
        {all.map((id) => {
          const active = unlocked.includes(id);
          return (
            <div
              key={id}
              className={clsx(
                "rounded-xl border px-3 py-2 text-sm",
                active
                  ? "border-teal-100/50 bg-teal-300/20 text-teal-100"
                  : "border-slate-100/20 bg-slate-100/5 text-slate-300/75",
              )}
            >
              {labels[id]}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AchievementList;
