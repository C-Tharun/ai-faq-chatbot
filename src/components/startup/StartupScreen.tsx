import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type StartupScreenProps = {
  onDone: () => void;
  durationMs?: number;
};

// Simple boot sequence splash that fades after a short delay
export function StartupScreen({ onDone, durationMs = 3000 }: StartupScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), durationMs);
    return () => clearTimeout(t);
  }, [durationMs]);

  useEffect(() => {
    if (!visible) onDone();
  }, [visible, onDone]);

  const steps = [
    "Deploying Cloudflare AI…",
    "Loading Memory…",
    "Chatbot Ready ✅",
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-50 dark:bg-neutral-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <div className="text-xl font-semibold mb-4">AI FAQ Chatbot</div>
            <div className="space-y-1">
              {steps.map((text, idx) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.6 }}
                  className="text-neutral-600 dark:text-neutral-300"
                >
                  {text}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


