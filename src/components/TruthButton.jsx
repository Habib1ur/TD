import { motion } from "framer-motion";
import { MessageCircleHeart } from "lucide-react";

function TruthButton({ onClick, disabled }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="group relative flex h-28 w-full items-center justify-center gap-3 overflow-hidden rounded-2xl border border-teal-100/60 bg-gradient-to-br from-teal-500 to-cyan-500 px-6 text-2xl font-bold text-white shadow-lg shadow-cyan-950/45 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-100 disabled:cursor-not-allowed disabled:opacity-65 sm:h-32"
      aria-label="Pick Truth"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,.3),transparent_55%)]" />
      <MessageCircleHeart className="relative z-10" size={30} />
      <span className="relative z-10 font-display tracking-wide">TRUTH</span>
    </motion.button>
  );
}

export default TruthButton;
