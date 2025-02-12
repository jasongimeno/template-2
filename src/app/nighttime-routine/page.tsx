import ChecklistPage from '@/components/ChecklistPage';

const nighttimeItems = [
  { id: 'teeth-pm', text: 'Brushed my teeth' },
  { id: 'chromebook', text: 'Charged my Chromebook' },
  { id: 'backpack', text: 'Checked my planner and packed my backpack with everything I need' },
];

export default function NighttimeRoutine() {
  return (
    <ChecklistPage 
      title="Nighttime Routine" 
      items={nighttimeItems}
    />
  );
} 