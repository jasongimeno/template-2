'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addDocument } from '@/lib/firebase/firebaseUtils';
import emailjs from '@emailjs/browser';
import { format } from 'date-fns';

interface ChecklistItem {
  id: string;
  text: string;
}

interface ChecklistPageProps {
  title: string;
  items: ChecklistItem[];
}

// Initialize EmailJS with public key
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);

export default function ChecklistPage({ title, items }: ChecklistPageProps) {
  const router = useRouter();
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckboxChange = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const sendEmail = async (checklistResults: any[]) => {
    // Create email content
    const templateParams = {
      to_emails: 'techmdjason@gmail.com, hbjules8@yahoo.com',
      subject: `Luke's ${title} Checklist - ${format(new Date(), 'PPP')}`,
      checklist_type: title,
      checklist_items: checklistResults.map(result => 
        `${result.task}: ${result.completed ? '✅ Completed' : '❌ Not Completed'}`
      ).join('\n'),
      timestamp: format(new Date(), 'PPpp'),
    };

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const timestamp = new Date().toISOString();
    const checklistResults = items.map(item => ({
      task: item.text,
      completed: !!checkedItems[item.id]
    }));

    try {
      // Save to Firebase without wrapping in a data object
      await addDocument('checklists', {
        type: title,
        timestamp,
        results: checklistResults
      });

      // Send email
      await sendEmail(checklistResults);

      alert('Checklist submitted successfully!');
      router.push('/');
    } catch (error) {
      console.error('Error submitting checklist:', error);
      alert('Error submitting checklist. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">{title}</h1>
      
      <div className="max-w-md mx-auto space-y-4">
        {items.map(item => (
          <div 
            key={item.id}
            className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow"
          >
            <input
              type="checkbox"
              id={item.id}
              checked={!!checkedItems[item.id]}
              onChange={() => handleCheckboxChange(item.id)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor={item.id} className="flex-1 text-lg">
              {item.text}
            </label>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors
            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
} 