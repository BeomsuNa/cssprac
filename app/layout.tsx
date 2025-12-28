// app/layout.tsx (루트)
'use client';
import {  Geist_Mono } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const geistSans = Geist_Mono({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


 export default  function RootLayout({ children }: { children: React.ReactNode }) {


  return (
    <html lang="ko" >
      <body className={`
        ${geistSans.variable} antialiased
        ${'pinpage-body-fullscreen' }
      `}>
        {children}
      </body>
    </html>
  );
}
