import { useEffect, useState } from "react";

type Mode = "Professional" | "Friendly" | "Techy";

type ModeSelectorProps = {
  value?: Mode;
  onChange?: (mode: Mode) => void;
};

// Small dropdown to switch AI personality, persisted in sessionStorage
export function ModeSelector({ value, onChange }: ModeSelectorProps) {
  const [mode, setMode] = useState<Mode>(() => {
    const saved = sessionStorage.getItem("ai-mode") as Mode | null;
    return saved || (value ?? "Professional");
  });

  useEffect(() => {
    sessionStorage.setItem("ai-mode", mode);
    onChange?.(mode);
  }, [mode, onChange]);

  return (
    <select
      aria-label="AI personality mode"
      className="border border-neutral-200 dark:border-neutral-800 rounded-md bg-white dark:bg-neutral-900 text-sm px-2 py-1"
      value={mode}
      onChange={(e) => setMode(e.target.value as Mode)}
    >
      <option>Professional</option>
      <option>Friendly</option>
      <option>Techy</option>
    </select>
  );
}


