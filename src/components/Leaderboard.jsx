import { Crown } from "lucide-react";

function Leaderboard({ players, activePlayerId }) {
  return (
    <section
      className="mt-5 rounded-2xl border border-teal-100/20 bg-slate-900/35 p-4"
      aria-label="Leaderboard"
    >
      <h3 className="mb-3 flex items-center gap-2 font-display text-lg">
        <Crown size={18} className="text-amber-300" />
        Leaderboard
      </h3>

      <ol className="space-y-2">
        {players.map((player, index) => (
          <li
            key={player.id}
            className={`flex items-center justify-between rounded-xl border px-3 py-2 ${
              player.id === activePlayerId
                ? "border-teal-100/45 bg-teal-300/15"
                : "border-slate-100/15 bg-slate-950/40"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-6 text-sm font-bold text-slate-200/85">
                #{index + 1}
              </span>
              <span className="font-semibold text-white">{player.name}</span>
            </div>
            <div className="text-sm text-slate-200/85">
              {player.stats.points} pts • {player.stats.completedTasks} tasks
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Leaderboard;
