import ChecklistPage from '@/components/ChecklistPage';

const nighttimeItems = [
  { id: 'teeth-pm', text: 'Brushed my teeth' },
  { id: 'chromebook', text: 'Charged my Chromebook' },
  { id: 'backpack', text: 'Checked my planner and packed my backpack with everything I need' },
  { id: 'playroom', text: 'Turned off fan and TV in play room' },
  { id: 'clothes', text: 'Sorted clothes into laundry or hung back up' },
];

export default function NighttimeRoutine() {
  return (
    <ChecklistPage 
      title="Nighttime Routine" 
      items={nighttimeItems}
    />
  );
} 