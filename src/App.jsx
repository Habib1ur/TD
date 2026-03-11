import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { useGame } from "./context/GameContext";
import AnimatedBackground from "./components/AnimatedBackground";
import Home from "./pages/Home";
import Game from "./pages/Game";

function App() {
  const { screen, darkMode } = useGame();

  const page = useMemo(() => {
    if (screen === "home") {
      return <Home key="home" />;
    }
    return <Game key="game" />;
  }, [screen]);

  return (
    <div
      className={clsx(
        "relative min-h-screen overflow-hidden transition-colors duration-500",
        darkMode
          ? "bg-[radial-gradient(circle_at_10%_0%,#14314a_0%,#0f172a_46%,#111827_100%)] text-white"
          : "bg-[radial-gradient(circle_at_15%_10%,#ecfeff_0%,#e0f2fe_45%,#dbeafe_100%)] text-slate-900",
      )}
    >
      <AnimatedBackground />
      <AnimatePresence mode="wait">
        <motion.main
          key={screen}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative z-10"
        >
          {page}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

export default App;
