// app/page.tsx
'use client'
import { Button } from '@/components/ui/button';
import '../globals.css';
import Link from 'next/link';

export default function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section - OCCUPY 스타일 흉내 */}
      <section className="flex flex-col items-center justify-center h-screen text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wider mb-8 opacity-0 animate-fade-in">
          TO FILL, EXIST IN, OR TO KEEP SOMEONE INTERESTED
        </h1>
        <nav className="grid grid-cols-2 gap-8 max-w-md">
          <Button className="bg-transparent border border-white text-white hover:bg-white hover:text-black transition duration-300">
            <Link href="/robot">3D Image</Link>
          </Button>
          <Button className="bg-transparent border border-white text-white hover:bg-white hover:text-black transition duration-300">
            <Link href="/pinpage">Pin Page</Link>
          </Button>
          <Button className="bg-transparent border border-white text-white hover:bg-white hover:text-black transition duration-300">
            <Link href="/scrollpage">Scroll Page</Link>
          </Button>
          <Button className="bg-transparent border border-white text-white hover:bg-white hover:text-black transition duration-300">
            <Link href="/csspage">CSS Page</Link>
          </Button>
        </nav>
      </section>
      <main>{children}</main>
    </div>
  );
}