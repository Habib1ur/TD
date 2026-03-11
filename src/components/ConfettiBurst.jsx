import { AnimatePresence, motion } from "framer-motion";

const bits = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  bg: ["#34d399", "#22d3ee", "#fb7185", "#fbbf24"][i % 4],
  delay: i * 0.02,
}));

function ConfettiBurst({ active }) {
  return (
    <AnimatePresence>
      {active && (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          {bits.map((b) => (
            <motion.span
              key={b.id}
              className="absolute top-2 h-2 w-2 rounded-sm"
              style={{ left: b.left, backgroundColor: b.bg }}
              initial={{ y: -12, opacity: 1, rotate: 0 }}
              animate={{ y: 220, opacity: 0, rotate: 280 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, delay: b.delay, ease: "easeOut" }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

export default ConfettiBurst;
