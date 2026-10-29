export function speakEnglish(text: string): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const cleanText = text.replace(/\[.*?\]/g, '').trim();
  if (!cleanText) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'en-US';
  utterance.rate = 0.95; // Slightly slower for clear educational listening
  utterance.pitch = 1.0;

  window.speechSynthesis.speak(utterance);
}

