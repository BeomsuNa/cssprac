// app/layout.tsx
import { Button } from '@/components/ui/button';
import './globals.css';
import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <header>
            <h2>해당 링크들을 클릭하세요</h2>
          <nav className='grid grid-rows-2 grid-cols-2 gap-4 '>
            <Button><Link href="/">Home</Link></Button>
            <Button><Link href="/pinpage">Pin Page</Link></Button>
            <Button><Link href="/scrollpage">Scroll Page</Link></Button>
            <Button><Link href="/csspage">CSS Page</Link></Button>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}