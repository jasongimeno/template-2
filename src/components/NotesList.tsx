'use client';

import { useEffect, useState } from 'react';
import { getDocuments, deleteDocument } from '@/lib/firebase/firebaseUtils';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';

interface Note {
  id: string;
  text: string;
  timestamp: string;
}

interface NotesListProps {
  refreshTrigger: number;
}

export default function NotesList({ refreshTrigger }: NotesListProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const fetchedNotes = await getDocuments('notes');
      setNotes(fetchedNotes.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ));
    };

    fetchNotes();
  }, [refreshTrigger]);

  const handleDelete = async (noteId: string) => {
    try {
      setIsDeleting(noteId);
      await deleteDocument('notes', noteId);
      setNotes(notes.filter(note => note.id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Your Notes</h2>
      <div className="space-y-4">
        {notes.map((note) => (
          <div 
            key={note.id} 
            className="p-4 bg-white rounded-lg shadow border hover:shadow-md transition-shadow relative group"
          >
            <button
              onClick={() => handleDelete(note.id)}
              className={`absolute top-2 right-2 p-2 rounded-full 
                hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100
                ${isDeleting === note.id ? 'cursor-not-allowed opacity-50' : ''}`}
              disabled={isDeleting === note.id}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
            <p className="text-gray-600 pr-8">{note.text}</p>
            <p className="text-sm text-gray-400 mt-2">
              {format(new Date(note.timestamp), 'PPpp')}
            </p>
          </div>
        ))}
        {notes.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No notes yet. Start recording to create your first note!
          </p>
        )}
      </div>
    </div>
  );
} 