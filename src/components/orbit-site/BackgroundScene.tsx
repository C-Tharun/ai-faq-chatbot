import { motion } from "framer-motion";

// Decorative, performant background with:
// - Gradient mesh base
// - Two slowly drifting orbs
// - Subtle grid pattern
// - Soft vignette around edges
export function BackgroundScene() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Theme surface so whole page participates in dark mode */}
      <div className="absolute inset-0 bg-neutral-50 dark:bg-neutral-950 transition-colors" />
      {/* Base gradient mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_20%,rgba(244,129,32,0.10),transparent_60%),radial-gradient(60%_60%_at_80%_80%,rgba(59,130,246,0.10),transparent_60%)]" />

      {/* Animated orbs */}
      <motion.div
        className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#F48120]/35 dark:bg-[#F48120]/45 blur-3xl"
        animate={{ y: [0, -10, 0], x: [0, 6, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-[#5ea0ff]/35 dark:bg-[#5ea0ff]/45 blur-3xl"
        animate={{ y: [0, 10, 0], x: [0, -6, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.08] [background-size:32px_32px] [background-image:linear-gradient(to_right,rgba(0,0,0,0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.6)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.35)_1px,transparent_1px)]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_20%,transparent_50%,rgba(0,0,0,0.08)_80%)] dark:bg-[radial-gradient(120%_120%_at_50%_20%,transparent_50%,rgba(0,0,0,0.22)_80%)]" />
    </div>
  );
}


