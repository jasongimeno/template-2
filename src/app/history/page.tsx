'use client';

import { useEffect, useState } from 'react';
import { getDocuments } from '@/lib/firebase/firebaseUtils';
import { format } from 'date-fns';
import Link from 'next/link';

interface ChecklistResult {
  task: string;
  completed: boolean;
}

interface ChecklistEntry {
  id?: string;
  type: string;
  timestamp: string;
  results: ChecklistResult[];
}

interface FirebaseDoc {
  id: string;
  data: {
    type: string;
    timestamp: string;
    results: ChecklistResult[];
  };
}

export default function History() {
  const [entries, setEntries] = useState<ChecklistEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const docs = await getDocuments('checklists') as FirebaseDoc[];
        const transformedDocs = docs.map(doc => ({
          id: doc.id,
          type: doc.data.type || '',
          timestamp: doc.data.timestamp || new Date().toISOString(),
          results: doc.data.results || []
        }));
        
        setEntries(transformedDocs.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        ));
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Checklist History</h1>
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Checklist History</h1>
        <Link 
          href="/"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Back Home
        </Link>
      </div>

      {entries.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          No checklist entries yet.
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Checklist Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {entries.map((entry) => (
                  entry.results.map((result, index) => (
                    <tr key={`${entry.id}-${index}`}>
                      {index === 0 && (
                        <>
                          <td 
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                            rowSpan={entry.results.length}
                          >
                            {format(new Date(entry.timestamp), 'PPp')}
                          </td>
                          <td 
                            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                            rowSpan={entry.results.length}
                          >
                            {entry.type}
                          </td>
                        </>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {result.task}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          result.completed 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {result.completed ? 'Completed' : 'Not Completed'}
                        </span>
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
} 