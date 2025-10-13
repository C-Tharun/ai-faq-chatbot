import { useEffect, useMemo, useRef, useState } from "react";
import { Microphone, MicrophoneSlash } from "@phosphor-icons/react";

type VoiceInputProps = {
  onTranscription: (text: string) => void;
  ttsEnabled?: boolean;
  onToggleTts?: (enabled: boolean) => void;
};

// Lightweight Web Speech API wrapper. Falls back gracefully if unsupported.
export function VoiceInput({ onTranscription, ttsEnabled, onToggleTts }: VoiceInputProps) {
  const recognitionRef = useRef<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [supported, setSupported] = useState(false);

  const SpeechRecognition = useMemo(() => {
    // @ts-expect-error vendor prefixed
    return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  }, []);

  useEffect(() => {
    setSupported(!!SpeechRecognition);
  }, [SpeechRecognition]);

  useEffect(() => {
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = navigator.language || "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognitionRef.current = recognition;

    const handleResult = (event: any) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      // Only fire when result is final to avoid flooding
      const isFinal = event.results[event.results.length - 1]?.isFinal;
      if (isFinal && transcript.trim()) {
        onTranscription(transcript.trim());
      }
    };

    const handleEnd = () => setIsRecording(false);
    const handleError = () => setIsRecording(false);

    recognition.addEventListener("result", handleResult);
    recognition.addEventListener("end", handleEnd);
    recognition.addEventListener("error", handleError);

    return () => {
      recognition.removeEventListener("result", handleResult);
      recognition.removeEventListener("end", handleEnd);
      recognition.removeEventListener("error", handleError);
      try {
        recognition.stop();
      } catch {}
    };
  }, [SpeechRecognition, onTranscription]);

  const toggleRecording = async () => {
    if (!recognitionRef.current) return;
    if (isRecording) {
      try {
        recognitionRef.current.stop();
      } catch {}
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch {
        setIsRecording(false);
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className={`inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap text-sm font-medium rounded-full p-1.5 h-fit border border-neutral-200 dark:border-neutral-800 ${
          isRecording ? "bg-red-500/10" : "bg-primary text-primary-foreground hover:bg-primary/90"
        }`}
        aria-label={isRecording ? "Stop voice input" : "Start voice input"}
        onClick={toggleRecording}
        disabled={!supported}
      >
        {isRecording ? <MicrophoneSlash size={16} /> : <Microphone size={16} />}
        <span className="sr-only">Voice</span>
        {isRecording && (
          // Pulse ring while recording
          <span className="ml-1 inline-block size-2 rounded-full bg-red-500 animate-ping" />
        )}
      </button>

      {/* Optional TTS toggle to have the bot speak responses */}
      {typeof onToggleTts === "function" && (
        <label className="flex items-center gap-1 text-xs text-neutral-600 dark:text-neutral-300 select-none">
          <input
            type="checkbox"
            className="accent-[#F48120]"
            checked={!!ttsEnabled}
            onChange={(e) => onToggleTts?.(e.target.checked)}
          />
          TTS
        </label>
      )}
    </div>
  );
}


