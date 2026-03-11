import { motion } from "framer-motion";
import { ArrowLeft, Forward, SkipForward, Trophy } from "lucide-react";

function ActionButton({ onClick, icon: Icon, label, className }) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 font-semibold text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-100 ${className}`}
    >
      <Icon size={18} />
      {label}
    </motion.button>
  );
}

function ControlButtons({ onNewTask, onSkip, onComplete, onBack }) {
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      <ActionButton
        onClick={onComplete}
        icon={Trophy}
        label="Completed"
        className="border-teal-100/45 bg-teal-500/35 hover:bg-teal-500/55"
      />
      <ActionButton
        onClick={onNewTask}
        icon={Forward}
        label="New Task"
        className="border-cyan-100/45 bg-cyan-500/35 hover:bg-cyan-500/50"
      />
      <ActionButton
        onClick={onSkip}
        icon={SkipForward}
        label="I Can't (-5)"
        className="border-orange-100/45 bg-orange-500/35 hover:bg-orange-500/50"
      />
      <ActionButton
        onClick={onBack}
        icon={ArrowLeft}
        label="Back to Menu"
        className="border-slate-100/35 bg-slate-100/10 hover:bg-slate-100/20"
      />
    </div>
  );
}

export default ControlButtons;
