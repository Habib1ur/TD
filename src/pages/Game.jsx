import { useCallback } from "react";
import GameCard from "../components/GameCard";
import TruthButton from "../components/TruthButton";
import DareButton from "../components/DareButton";
import TaskDisplay from "../components/TaskDisplay";
import ControlButtons from "../components/ControlButtons";
import ProgressPanel from "../components/ProgressPanel";
import AchievementList from "../components/AchievementList";
import TaskHistory from "../components/TaskHistory";
import Leaderboard from "../components/Leaderboard";
import { useGame } from "../context/GameContext";

function Game() {
  const {
    revealTask,
    currentTask,
    isSpinning,
    completeTask,
    skipTask,
    advanceToNextPlayer,
    setScreen,
    stats,
    levelProgress,
    truthHistory,
    dareHistory,
    playerName,
    players,
    activePlayerId,
    setActivePlayerId,
    leaderboard,
  } = useGame();

  const onPick = useCallback(
    (type) => {
      revealTask(type);
    },
    [revealTask],
  );

  const onComplete = useCallback(() => {
    if (!currentTask) return;
    completeTask();
    advanceToNextPlayer();
  }, [advanceToNextPlayer, completeTask, currentTask]);

  const onCant = useCallback(() => {
    if (!currentTask) return;
    const taskType = currentTask.type;
    skipTask();
    advanceToNextPlayer();
    onPick(taskType);
  }, [advanceToNextPlayer, currentTask, onPick, skipTask]);

  return (
    <div className="px-4 py-7 sm:px-6 sm:py-10">
      <GameCard className="relative">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-teal-200/25 bg-slate-900/35 px-4 py-3">
          <p className="font-display text-lg text-teal-100">
            {`Welcome, ${playerName || "Player"}`}
          </p>
          <div className="flex items-center gap-2">
            <label
              htmlFor="active-player"
              className="text-xs text-slate-300/80"
            >
              Active Player
            </label>
            <select
              id="active-player"
              value={activePlayerId || ""}
              onChange={(event) => setActivePlayerId(event.target.value)}
              className="rounded-lg border border-slate-100/30 bg-slate-950/70 px-2 py-1 text-sm text-white"
            >
              {players.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <TruthButton onClick={() => onPick("truth")} disabled={isSpinning} />
          <DareButton onClick={() => onPick("dare")} disabled={isSpinning} />
        </div>

        <TaskDisplay task={currentTask} isSpinning={isSpinning} />

        <ControlButtons
          onComplete={onComplete}
          onNewTask={() => currentTask && onPick(currentTask.type)}
          onSkip={onCant}
          onBack={() => setScreen("home")}
        />

        <ProgressPanel
          stats={stats}
          progress={levelProgress}
          playerName={playerName || "Player"}
        />
        <AchievementList unlocked={stats.achievements} />
        <Leaderboard players={leaderboard} activePlayerId={activePlayerId} />
        <TaskHistory truthHistory={truthHistory} dareHistory={dareHistory} />
      </GameCard>
    </div>
  );
}

export default Game;
