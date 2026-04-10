const DEFAULT_LANGUAGE = "en-IN";

export function startListening(onResult, onError, options = {}) {
  if (typeof window === "undefined") {
    onError?.("Voice recognition is not available in this browser.");
    return null;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    onError?.("Voice recognition is not supported in this browser.");
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = options.lang || options.language || DEFAULT_LANGUAGE;
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0]?.transcript || "")
      .join(" ")
      .trim()
      .toLowerCase();

    if (transcript) {
      onResult?.(transcript);
    }
  };

  recognition.onerror = (event) => {
    onError?.(event.error || "Voice recognition failed.");
  };

  try {
    recognition.start();
  } catch (error) {
    onError?.(error.message || "Voice recognition could not start.");
    return null;
  }

  return recognition;
}
