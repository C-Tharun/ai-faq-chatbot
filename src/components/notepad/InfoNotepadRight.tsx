import { motion } from "framer-motion";

export function InfoNotepadRight() {
  return (
    <motion.div
      className="hidden lg:block fixed right-4 top-1/2 -translate-y-1/2 z-10"
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      whileHover={{ y: -4, rotate: 1 }}
    >
      <div className="bg-blue-50/90 dark:bg-blue-900/30 border border-blue-200/80 dark:border-blue-800/60 shadow-xl rotate-[1deg] rounded-xl p-4 text-[11px] text-neutral-800 dark:text-neutral-200 backdrop-blur">
        <div className="font-semibold mb-1">Features</div>
        <ul className="list-disc pl-4 space-y-0.5 max-w-[220px]">
          <li>Understands context and memory</li>
          <li>Supports voice input</li>
          <li>Deployed at the edge for speed</li>
        </ul>
      </div>
    </motion.div>
  );
}


