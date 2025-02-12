import "./globals.css";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Jason's Voice Note App",
  description: 'Record and transcribe your voice notes with ease',
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
