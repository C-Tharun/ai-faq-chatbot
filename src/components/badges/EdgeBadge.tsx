import { useEffect, useState } from "react";

type EdgeInfo = { colo?: string; city?: string };

export function EdgeBadge() {
  const [info, setInfo] = useState<EdgeInfo>({});

  useEffect(() => {
    // Attempt to fetch region/colo info from Worker; fall back to a placeholder
    const run = async () => {
      try {
        const dev = (import.meta as any)?.env?.DEV;
        const base = dev ? "http://127.0.0.1:8787" : "";
        const res = await fetch(`${base}/edge-info`);
        if (res.ok) {
          const data = (await res.json().catch(() => ({}))) as EdgeInfo;
          setInfo(data);
          return;
        }
      } catch {}
      setInfo({ city: "Mumbai" });
    };
    run();
  }, []);

  const text = info.city || info.colo || "Edge";

  return (
    <div className="fixed bottom-2 right-2 z-10 text-[11px] px-2 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur">
      🌍 Connected via Cloudflare Edge: {text}
    </div>
  );
}


