const DEFAULT_LANGUAGE = "en-IN";

let lastSpokenText = "";
let lastSpokenOptions = {};

function getSpeechSynthesis() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return null;
  }

  return window.speechSynthesis;
}

function normalizeText(text) {
  if (Array.isArray(text)) {
    return text.filter(Boolean).join(" ");
  }

  return String(text || "").trim();
}

export function speakText(text, options = {}) {
  const spokenText = normalizeText(text);

  if (!spokenText) {
    return false;
  }

  lastSpokenText = spokenText;
  lastSpokenOptions = { ...options };

  const synth = getSpeechSynthesis();

  if (!synth || typeof SpeechSynthesisUtterance === "undefined") {
    return false;
  }

  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(spokenText);
  utterance.lang = options.lang || options.language || DEFAULT_LANGUAGE;
  utterance.rate = options.rate ?? 1;
  utterance.pitch = options.pitch ?? 1;
  utterance.volume = options.volume ?? 1;

  synth.speak(utterance);
  return true;
}

export function stopSpeaking() {
  const synth = getSpeechSynthesis();

  if (!synth) {
    return false;
  }

  synth.cancel();
  return true;
}

export function pauseSpeaking() {
  const synth = getSpeechSynthesis();

  if (!synth) {
    return false;
  }

  synth.pause();
  return true;
}

export function resumeSpeaking() {
  const synth = getSpeechSynthesis();

  if (!synth) {
    return false;
  }

  synth.resume();
  return true;
}

export function repeatLastSpoken() {
  if (!lastSpokenText) {
    return false;
  }

  return speakText(lastSpokenText, lastSpokenOptions);
}
