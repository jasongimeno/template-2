import "./globals.css";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Luke's Daily Checklists",
  description: 'Morning and nighttime routine checklist app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
