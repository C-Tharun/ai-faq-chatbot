import { motion } from "framer-motion";

export function HeroHeader() {
  return (
    <header className="w-full">
      {/* Top brand bar with gradient */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-1 w-full bg-gradient-to-r from-[#F48120] via-[#ffb14d] to-[#5ea0ff]" />
        </div>
        <div className="px-4 py-3 flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-[#F48120] to-[#ffb14d] shadow" />
          <div className="font-semibold">Cloudflare AI Chat</div>
          <div className="ml-auto text-xs text-neutral-500 dark:text-neutral-400">Edge‑optimized</div>
        </div>
      </div>

      {/* Subtle hero banner */}
      <motion.div
        className="px-4 pb-2"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative rounded-xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm p-3">
          <div className="text-sm text-neutral-700 dark:text-neutral-300">
            Lightning‑fast AI at the edge with a refined, modern interface.
          </div>
        </div>
      </motion.div>
    </header>
  );
}


