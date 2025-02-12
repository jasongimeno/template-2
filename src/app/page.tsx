'use client';

import Link from "next/link";
import VoiceRecorder from "@/components/VoiceRecorder";
import NotesList from "@/components/NotesList";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { DeepgramContextProvider } from "@/lib/contexts/DeepgramContext";
import { useState } from "react";

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleNoteAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <AuthProvider>
      <DeepgramContextProvider>
        <main className="min-h-screen p-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Jason's Voice Note App</h1>
          <div className="space-y-8">
            <VoiceRecorder onNoteAdded={handleNoteAdded} />
            <NotesList refreshTrigger={refreshTrigger} />
          </div>
        </main>
      </DeepgramContextProvider>
    </AuthProvider>
  );
}
