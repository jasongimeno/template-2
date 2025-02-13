'use client';

import Link from 'next/link';

const BasketballIcon = () => (
  <svg 
    viewBox="0 0 512 512" 
    width="150" 
    height="150" 
    className="mb-8"
    aria-hidden="true"
  >
    <circle 
      cx="256" 
      cy="256" 
      r="230" 
      fill="#f87171" 
      stroke="#dc2626" 
      strokeWidth="12"
    />
    {/* Horizontal line */}
    <path 
      d="M26 256h460" 
      stroke="#dc2626" 
      strokeWidth="12" 
      fill="none"
    />
    {/* Vertical line */}
    <path 
      d="M256 26v460" 
      stroke="#dc2626" 
      strokeWidth="12" 
      fill="none"
    />
    {/* Curved lines */}
    <path 
      d={`M450 126c-80 60-240 60-320 0M450 386c-80-60-240-60-320 0`}
      stroke="#dc2626" 
      strokeWidth="12" 
      fill="none"
    />
  </svg>
);

export default function Home() {
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-8">Luke&apos;s Daily Checklists</h1>
      
      <BasketballIcon />

      <div className="space-y-4 w-full max-w-md">
        <Link 
          href="/morning-routine" 
          className="w-full block bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-center transition-colors"
        >
          Morning Routine
        </Link>
        
        <Link 
          href="/nighttime-routine"
          className="w-full block bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-6 rounded-lg text-center transition-colors"
        >
          Nighttime Routine
        </Link>

        <div className="pt-8 text-center">
          <Link 
            href="/history"
            className="text-gray-600 hover:text-gray-900 text-sm underline transition-colors"
          >
            View History
          </Link>
        </div>
      </div>
    </main>
  );
}
