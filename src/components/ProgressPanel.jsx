import { motion } from "framer-motion";
import { Gauge, Target, TrendingUp, Zap } from "lucide-react";

function StatChip({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-slate-100/20 bg-slate-950/35 p-3">
      <div className="mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wide text-slate-300/80">
        <Icon size={14} />
        {label}
      </div>
      <div className="text-xl font-semibold text-white">{value}</div>
    </div>
  );
}

function ProgressPanel({ stats, progress, playerName }) {
  return (
    <section
      aria-label="Game progress"
      className="mt-5 rounded-2xl border border-teal-200/25 bg-slate-900/35 p-4"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-lg">Player Progress</h3>
          <p className="text-xs text-slate-300/80">
            {playerName || "Player One"}
          </p>
        </div>
        <span className="rounded-full border border-cyan-200/35 bg-cyan-300/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-100">
          Level {stats.level}
        </span>
      </div>

      <div className="mb-4 h-3 overflow-hidden rounded-full bg-slate-100/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-teal-300 via-cyan-300 to-orange-300"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatChip icon={Zap} label="Points" value={stats.points} />
        <StatChip icon={TrendingUp} label="Streak" value={stats.streak} />
        <StatChip icon={Gauge} label="Tasks" value={stats.completedTasks} />
        <StatChip
          icon={Target}
          label="Truth/Dare"
          value={`${stats.truthCount}/${stats.dareCount}`}
        />
      </div>
    </section>
  );
}

export default ProgressPanel;
