import { useState } from "react";
import { motion } from "framer-motion";
import { MoonStar, Play, Plus, Sun, Swords, UserRound, X } from "lucide-react";
import GameCard from "../components/GameCard";
import { useGame } from "../context/GameContext";

function Home() {
  const {
    setScreen,
    darkMode,
    setDarkMode,
    setPlayerName,
    players,
    addPlayer,
    removePlayer,
    activePlayerId,
    setActivePlayerId,
  } = useGame();

  const [startingName, setStartingName] = useState("");

  const onAddPlayer = () => {
    if (!startingName.trim()) return;
    addPlayer(startingName);
    setStartingName("");
  };

  const onStartGame = () => {
    if (startingName.trim()) {
      setPlayerName(startingName);
    } else if (players.length === 1) {
      // Keep fallback behavior for first-time start with empty input.
      setPlayerName("");
    }
    setScreen("game");
  };

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <GameCard className="max-w-3xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-teal-200/35 bg-teal-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-teal-100/90">
              <Swords size={14} />
              Simple Mode
            </p>
            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              Truth or Dare Arena
            </h1>
            <p className="mt-2 text-sm text-slate-200/85">
              Pick Truth or Dare, complete tasks, and level up.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setDarkMode((v) => !v)}
            className="rounded-xl border border-slate-200/30 bg-slate-50/10 p-2.5"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={20} /> : <MoonStar size={20} />}
          </button>
        </div>

        <div className="mt-4 rounded-2xl border border-teal-200/30 bg-slate-900/35 p-4">
          <label
            htmlFor="player-name"
            className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-teal-100"
          >
            <UserRound size={16} />
            Your Name
          </label>
          <input
            id="player-name"
            type="text"
            maxLength={24}
            value={startingName}
            onChange={(event) => setStartingName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") onAddPlayer();
            }}
            placeholder="Enter your name"
            className="w-full rounded-xl border border-slate-100/30 bg-slate-950/55 px-4 py-3 text-base text-white placeholder:text-slate-300/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-200"
            aria-label="Player name"
          />

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onAddPlayer}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-100/50 bg-cyan-500/40 px-4 py-2.5 text-sm font-semibold text-white hover:bg-cyan-500/55"
            >
              <Plus size={16} />
              Add Player
            </button>

            {players.map((player) => (
              <div
                key={player.id}
                className="inline-flex items-center gap-2 rounded-full border border-slate-100/25 bg-slate-950/45 px-3 py-1.5"
              >
                <button
                  type="button"
                  onClick={() => setActivePlayerId(player.id)}
                  className={`text-sm ${
                    player.id === activePlayerId
                      ? "font-semibold text-teal-100"
                      : "text-slate-200/85"
                  }`}
                >
                  {player.name}
                </button>
                {players.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePlayer(player.id)}
                    className="text-slate-300/80 hover:text-rose-300"
                    aria-label={`Remove ${player.name}`}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <motion.button
          type="button"
          whileHover={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStartGame}
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-teal-100/50 bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-4 font-display text-xl font-semibold text-white shadow-lg shadow-teal-950/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-100 sm:w-auto"
        >
          <Play size={20} />
          Start Game
        </motion.button>
      </GameCard>
    </div>
  );
}

export default Home;
