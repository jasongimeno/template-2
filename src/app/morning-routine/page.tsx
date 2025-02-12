import ChecklistPage from '@/components/ChecklistPage';

const morningItems = [
  { id: 'teeth-am', text: 'Brushed my teeth' },
  { id: 'towel', text: 'Hung up my towel' },
  { id: 'hygiene', text: 'Put on cologne and deodorant' },
];

export default function MorningRoutine() {
  return (
    <ChecklistPage 
      title="Morning Routine" 
      items={morningItems}
    />
  );
} 