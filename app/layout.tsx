import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Luna AI Diary',
  description: 'A little diary of everyday moments.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
