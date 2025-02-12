'use client';

import { useState } from 'react';
import { useDeepgram } from '../lib/contexts/DeepgramContext';
import { addDocument } from '../lib/firebase/firebaseUtils';
import { motion } from 'framer-motion';
import { Mic, Square } from 'lucide-react';

interface VoiceRecorderProps {
  onNoteAdded: () => void;
}

export default function VoiceRecorder({ onNoteAdded }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const { connectToDeepgram, disconnectFromDeepgram, connectionState, realtimeTranscript } = useDeepgram();

  const handleStartRecording = async () => {
    await connectToDeepgram();
    setIsRecording(true);
  };

  const handleStopRecording = async () => {
    disconnectFromDeepgram();
    setIsRecording(false);
    
    if (realtimeTranscript.trim()) {
      await addDocument('notes', {
        text: realtimeTranscript.trim(),
        timestamp: new Date().toISOString(),
      });
      onNoteAdded();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <button
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-lg text-white font-medium transition-all ${
          isRecording 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-orange-500 hover:bg-orange-600'
        }`}
      >
        {isRecording ? (
          <>
            <Square className="w-5 h-5" />
            Stop Recording
          </>
        ) : (
          <>
            <Mic className="w-5 h-5" />
            Start Recording
          </>
        )}
      </button>

      {isRecording && (
        <div className="p-6 bg-white rounded-lg shadow-sm border">
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-4 h-4 bg-red-500 rounded-full"
            />
          </div>
          <p className="text-gray-700 text-center">
            {realtimeTranscript || "Listening..."}
          </p>
        </div>
      )}
    </div>
  );
}