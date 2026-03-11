import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useTaskGenerator } from "../hooks/useTaskGenerator";
import truthQuestions from "../data/truthQuestions";
import dareChallenges from "../data/dareChallenges";

const GameContext = createContext(null);

const LEVEL_STEP = 100;
const CANT_TASK_PENALTY = 5;

function createBaseStats() {
  return {
    points: 0,
    streak: 0,
    completedTasks: 0,
    truthCount: 0,
    dareCount: 0,
    level: 1,
    achievements: [],
  };
}

function normalizePlayer(name) {
  const trimmed = name.trim();
  if (!trimmed) return "Player One";
  return trimmed.slice(0, 24);
}

function createPlayer(name) {
  return {
    id: `p-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: normalizePlayer(name),
    stats: createBaseStats(),
  };
}

function getLevel(points) {
  return Math.floor(points / LEVEL_STEP) + 1;
}

function getNextPlayerId(players, currentId) {
  if (!players.length) return null;
  if (players.length === 1) return players[0].id;

  const resolvedCurrentId = currentId || players[0].id;
  const currentIndex = players.findIndex(
    (player) => player.id === resolvedCurrentId,
  );
  if (currentIndex === -1) return players[0].id;

  return players[(currentIndex + 1) % players.length].id;
}

export function GameProvider({ children }) {
  const [screen, setScreen] = useState("home");
  const [players, setPlayers] = useState([createPlayer("Player One")]);
  const [activePlayerId, setActivePlayerId] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [currentTask, setCurrentTask] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const truthGenerator = useTaskGenerator(truthQuestions);
  const dareGenerator = useTaskGenerator(dareChallenges);

  const activePlayer = useMemo(
    () => players.find((p) => p.id === activePlayerId) || players[0],
    [activePlayerId, players],
  );

  const stats = activePlayer?.stats || createBaseStats();
  const playerName = activePlayer?.name || "Player One";

  const updateActivePlayerStats = useCallback(
    (updater) => {
      setPlayers((prev) =>
        prev.map((player) =>
          player.id === (activePlayerId || prev[0]?.id)
            ? { ...player, stats: updater(player.stats) }
            : player,
        ),
      );
    },
    [activePlayerId],
  );

  const addPlayer = useCallback((name) => {
    const newPlayer = createPlayer(name);
    setPlayers((prev) => [...prev, newPlayer]);
    setActivePlayerId(newPlayer.id);
  }, []);

  const removePlayer = useCallback(
    (id) => {
      setPlayers((prev) => {
        if (prev.length <= 1) return prev;
        return prev.filter((p) => p.id !== id);
      });

      setActivePlayerId((current) => {
        if (!current || current !== id) return current;
        const remaining = players.filter((p) => p.id !== id);
        return remaining[0]?.id || null;
      });
    },
    [players],
  );

  const setPlayerName = useCallback(
    (name) => {
      const finalName = normalizePlayer(name);
      setPlayers((prev) =>
        prev.map((player) =>
          player.id === (activePlayerId || prev[0]?.id)
            ? { ...player, name: finalName }
            : player,
        ),
      );
    },
    [activePlayerId],
  );

  const revealTask = useCallback(
    (type) => {
      setIsSpinning(true);
      window.setTimeout(() => {
        const text =
          type === "truth"
            ? truthGenerator.nextTask()
            : dareGenerator.nextTask();
        setCurrentTask({ type, text, time: Date.now() });
        setIsSpinning(false);
      }, 550);
    },
    [dareGenerator, truthGenerator],
  );

  const completeTask = useCallback(() => {
    if (!currentTask) return;

    updateActivePlayerStats((prev) => {
      const isDare = currentTask.type === "dare";
      const pointsGain = isDare ? 20 : 10;
      const nextPoints = prev.points + pointsGain;
      const completed = prev.completedTasks + 1;

      return {
        ...prev,
        points: nextPoints,
        streak: prev.streak + 1,
        completedTasks: completed,
        truthCount: prev.truthCount + (currentTask.type === "truth" ? 1 : 0),
        dareCount: prev.dareCount + (isDare ? 1 : 0),
        level: getLevel(nextPoints),
        achievements: [
          completed >= 1 ? "first" : null,
          completed >= 5 ? "five" : null,
          completed >= 10 ? "ten" : null,
        ].filter(Boolean),
      };
    });
    setCurrentTask(null);
  }, [currentTask, updateActivePlayerStats]);

  const skipTask = useCallback(() => {
    if (!currentTask) return;

    updateActivePlayerStats((prev) => {
      const nextPoints = Math.max(0, prev.points - CANT_TASK_PENALTY);

      return {
        ...prev,
        points: nextPoints,
        streak: 0,
        level: getLevel(nextPoints),
      };
    });
    setCurrentTask(null);
  }, [currentTask, updateActivePlayerStats]);

  const advanceToNextPlayer = useCallback(() => {
    setActivePlayerId((current) => getNextPlayerId(players, current));
  }, [players]);

  const resetGame = useCallback(() => {
    setCurrentTask(null);
    setPlayers((prev) =>
      prev.map((player) => ({ ...player, stats: createBaseStats() })),
    );
    truthGenerator.reset();
    dareGenerator.reset();
    setScreen("home");
  }, [dareGenerator, truthGenerator]);

  const leaderboard = useMemo(
    () =>
      [...players].sort((a, b) => {
        if (b.stats.points !== a.stats.points) {
          return b.stats.points - a.stats.points;
        }
        return b.stats.completedTasks - a.stats.completedTasks;
      }),
    [players],
  );

  const value = useMemo(
    () => ({
      screen,
      setScreen,
      playerName,
      setPlayerName,
      players,
      addPlayer,
      removePlayer,
      activePlayerId,
      setActivePlayerId,
      leaderboard,
      darkMode,
      setDarkMode,
      currentTask,
      revealTask,
      completeTask,
      skipTask,
      advanceToNextPlayer,
      resetGame,
      stats,
      levelProgress: stats.points % LEVEL_STEP,
      isSpinning,
      truthHistory: truthGenerator.history,
      dareHistory: dareGenerator.history,
    }),
    [
      completeTask,
      currentTask,
      darkMode,
      dareGenerator.history,
      isSpinning,
      playerName,
      players,
      addPlayer,
      removePlayer,
      activePlayerId,
      leaderboard,
      resetGame,
      revealTask,
      screen,
      skipTask,
      advanceToNextPlayer,
      stats,
      truthGenerator.history,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within GameProvider");
  }
  return context;
}
