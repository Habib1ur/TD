import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { Sparkles } from "lucide-react";

function TaskDisplay({ task, isSpinning }) {
  return (
    <div className="mt-6 min-h-44 rounded-2xl border border-teal-100/25 bg-slate-900/35 p-5">
      <AnimatePresence mode="wait">
        {isSpinning ? (
          <motion.div
            key="spinner"
            className="flex h-32 flex-col items-center justify-center gap-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <motion.div
              className="h-12 w-12 rounded-full border-4 border-white/40 border-t-white"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.85, ease: "linear" }}
            />
            <p className="text-slate-100/90">Spinning challenge wheel...</p>
          </motion.div>
        ) : task ? (
          <motion.article
            key={task.time}
            initial={{ rotateX: -90, opacity: 0, y: 10 }}
            animate={{ rotateX: 0, opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="rounded-xl border border-slate-100/20 bg-slate-950/45 p-5"
          >
            <div className="mb-3 flex items-center gap-2">
              <Sparkles size={18} className="text-amber-300" />
              <span
                className={clsx(
                  "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                  task.type === "truth"
                    ? "bg-teal-400/20 text-teal-100"
                    : "bg-orange-400/20 text-orange-100",
                )}
              >
                {task.type}
              </span>
            </div>
            <p className="text-lg leading-relaxed text-white sm:text-xl">
              {task.text}
            </p>
          </motion.article>
        ) : (
          <motion.p
            key="empty"
            className="flex h-32 items-center justify-center text-center text-slate-100/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Choose Truth or Dare to reveal your first challenge.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TaskDisplay;
