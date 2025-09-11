'use client';

import { useVoiceRecognition } from '@/hooks/use-voice-recognition';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface VoiceInputProps {
  onResult: (transcript: string) => void;
}

export default function VoiceInput({ onResult }: VoiceInputProps) {
  const { toast } = useToast();
  const { isRecording, startRecognition, stopRecognition, isSupported, error } = useVoiceRecognition({ onResult });

  useEffect(() => {
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Voice Recognition Error',
        description: error,
      });
    }
  }, [error, toast]);

  if (!isSupported) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-4 border-t">
        <div className="container mx-auto flex justify-center items-center text-destructive-foreground bg-destructive p-3 rounded-md">
            <MicOff className="w-5 h-5 mr-2" />
            <p className="text-sm font-medium">Voice recognition is not supported in your browser.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-4 border-t">
      <div className="container mx-auto flex justify-center items-center">
        <Button
          onClick={isRecording ? stopRecognition : startRecognition}
          size="lg"
          className={cn(
            'w-16 h-16 rounded-full shadow-lg transition-all duration-300 ease-in-out',
            isRecording ? 'bg-destructive hover:bg-destructive/90 animate-pulse' : 'bg-primary hover:bg-primary/90'
          )}
          aria-label={isRecording ? 'Stop recording' : 'Start recording'}
        >
          <Mic className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
}
