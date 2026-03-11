import { motion } from "framer-motion";

const particles = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  size: 14 + (i % 5) * 10,
  top: `${(i * 13) % 100}%`,
  left: `${(i * 17) % 100}%`,
  duration: 9 + (i % 4) * 2,
}));

function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(45,212,191,0.24),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(251,146,60,0.2),transparent_30%),radial-gradient(circle_at_65%_90%,rgba(56,189,248,0.16),transparent_42%)]" />
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-teal-100/25"
          style={{ width: p.size, height: p.size, top: p.top, left: p.left }}
          animate={{ y: [-8, 10, -8], opacity: [0.2, 0.55, 0.2] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default AnimatedBackground;
