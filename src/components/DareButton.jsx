import { motion } from "framer-motion";
import { Flame } from "lucide-react";

function DareButton({ onClick, disabled }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="group relative flex h-28 w-full items-center justify-center gap-3 overflow-hidden rounded-2xl border border-orange-100/60 bg-gradient-to-br from-orange-500 to-rose-500 px-6 text-2xl font-bold text-white shadow-lg shadow-rose-950/45 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-100 disabled:cursor-not-allowed disabled:opacity-65 sm:h-32"
      aria-label="Pick Dare"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(255,255,255,.32),transparent_60%)]" />
      <Flame className="relative z-10" size={30} />
      <span className="relative z-10 font-display tracking-wide">DARE</span>
    </motion.button>
  );
}

export default DareButton;
