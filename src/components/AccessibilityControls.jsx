import { useEffect, useRef, useState } from "react";
import { pauseSpeaking, repeatLastSpoken, resumeSpeaking, speakText, stopSpeaking } from "../utils/speech";
import { startListening } from "../utils/voiceAssistant";

export default function AccessibilityControls({
  autoReadText = "",
  pageText = "",
  onVoiceCommand,
  language = "en-IN",
}) {
  const [isListening, setIsListening] = useState(false);
  const lastAutoReadText = useRef("");

  useEffect(() => {
    if (!autoReadText || lastAutoReadText.current === autoReadText) {
      return;
    }

    lastAutoReadText.current = autoReadText;
    speakText(autoReadText, { lang: language });
  }, [autoReadText, language]);

  const readSummary = () => {
    speakText(autoReadText || "No page summary is available.", { lang: language });
  };

  const readPage = () => {
    speakText(pageText || autoReadText || "No page text is available.", { lang: language });
  };

  const repeatSpeech = () => {
    if (!repeatLastSpoken()) {
      speakText("Nothing has been spoken yet.", { lang: language });
    }
  };

  const handleVoiceCommand = () => {
    setIsListening(true);

    const recognition = startListening(
      (transcript) => {
        setIsListening(false);

        if (onVoiceCommand) {
          onVoiceCommand(transcript, { autoReadText, pageText, language });
          return;
        }

        speakText(`Voice command heard: ${transcript}. This page has no voice command handler.`, { lang: language });
      },
      (errorMessage) => {
        setIsListening(false);
        speakText(String(errorMessage || "Voice recognition is not available in this browser."), { lang: language });
      },
      { lang: language },
    );

    if (!recognition) {
      setIsListening(false);
      return;
    }

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <div
      aria-label="Accessibility speech controls"
      className="fixed bottom-24 left-1/2 z-50 grid w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 grid-cols-2 gap-2 rounded-2xl border border-gray-200 bg-white/95 p-3 shadow-[0_18px_44px_rgba(15,23,42,0.16)] backdrop-blur"
      role="group"
    >
      <ControlButton label="Read Summary" onClick={readSummary} variant="primary" />
      <ControlButton label="Read Page" onClick={readPage} />
      <ControlButton label="Repeat" onClick={repeatSpeech} />
      <ControlButton label="Pause" onClick={pauseSpeaking} />
      <ControlButton label="Resume" onClick={resumeSpeaking} />
      <ControlButton label="Stop" onClick={stopSpeaking} variant="danger" />
      <button
        type="button"
        onClick={handleVoiceCommand}
        aria-label={isListening ? "Listening for voice command" : "Start voice command"}
        className="col-span-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:border-gray-300 hover:bg-white"
      >
        {isListening ? "Listening..." : "Voice Command"}
      </button>
    </div>
  );
}

function ControlButton({ label, onClick, variant = "default" }) {
  const className =
    variant === "primary"
      ? "rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
      : variant === "danger"
        ? "rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500"
        : "rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50";

  return (
    <button type="button" onClick={onClick} aria-label={label} className={className}>
      {label}
    </button>
  );
}
