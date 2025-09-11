'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

interface VoiceRecognitionHook {
  isRecording: boolean;
  startRecognition: () => void;
  stopRecognition: () => void;
  isSupported: boolean;
  error: string | null;
}

export const useVoiceRecognition = ({ onResult }: { onResult: (transcript: string) => void }): VoiceRecognitionHook => {
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
    }
  }, []);

  const onResultCallback = useCallback(onResult, [onResult]);

  useEffect(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => {
      setIsRecording(false);
    };
    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error !== 'no-speech') {
            setError(`Error: ${event.error}`);
        }
        setIsRecording(false);
    };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResultCallback(transcript);
    };
  }, [onResultCallback]);

  const startRecognition = () => {
    const recognition = recognitionRef.current;
    if (recognition && !isRecording) {
      setError(null);
      try {
        recognition.start();
      } catch (e) {
        console.error("Error starting recognition:", e);
        setError("Could not start recognition.");
      }
    }
  };

  const stopRecognition = () => {
    const recognition = recognitionRef.current;
    if (recognition && isRecording) {
      recognition.stop();
    }
  };

  return { isRecording, startRecognition, stopRecognition, isSupported, error };
};
