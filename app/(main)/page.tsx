// app/page.tsx
'use client'
import { Button } from '@/components/ui/button';
import '../globals.css';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  const [text, setText] = useState("WC\nIC");
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // 텍스트를 글자별로 분리
    const letters = textRef.current.querySelectorAll('span');
    const tl = gsap.timeline();

    // 단계 1: 텍스트 등장 (기존처럼)
    tl.fromTo(letters, { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.05 });

    // 단계 2: 특정 글자(W, C, I, C)를 제외한 나머지를 fade out
    // "WC\nIC"의 인덱스: W(0), C(1), I(2), C(3) - 모든 span 유지
    const keepIndices = [0, 1, 2, 3];
    // letters.forEach 생략 - fade out 없음

    // 단계 3: 남은 글자들을 중앙으로 모으기 (WC와 IC를 각각 그룹으로)
    const keptLetters = keepIndices.map(i => letters[i]);
    const containerWidth = textRef.current.offsetWidth;
    const centerX = containerWidth / 2;
    // WC 그룹 (인덱스 0,1): 왼쪽 중앙
    const wcGroup = [keptLetters[0], keptLetters[1]];
    wcGroup.forEach((letter, i) => {
      if(!textRef.current) return;
      const letterRect = letter.getBoundingClientRect();
      const currentX = letterRect.left - textRef.current.getBoundingClientRect().left;
      const targetX = centerX - 30 + i * 20; // WC 중앙 왼쪽
      tl.to(letter, { x: targetX - currentX, duration: 1, ease: "power2.out" }, "-=0.5");
    });
    // IC 그룹 (인덱스 2,3): 오른쪽 중앙
    const icGroup = [keptLetters[2], keptLetters[3]];
    icGroup.forEach((letter, i) => {
      if(!textRef.current) return;
      const letterRect = letter.getBoundingClientRect();
      const currentX = letterRect.left - textRef.current.getBoundingClientRect().left;
      const targetX = centerX + 10 + i * 20; // IC 중앙 오른쪽
      tl.to(letter, { x: targetX - currentX, duration: 1, ease: "power2.out" }, "-=0.5");
    });

    // 단계 4: 최종 "WCIC" 형태로 유지 (추가 애니메이션 없음, 그대로 유지)
    tl.to(keptLetters, { scale: 1.2, duration: 0.5 }); // 로고 느낌으로 살짝 확대

  }, [text]);

  // 텍스트를 글자별로 span으로 분리, 줄바꿈 처리
  const renderText = (text: string) => {
    return text.split('').map((char, index) => {
      if (char === '\n') {
        return <br key={index} />;
      }
      return (
        <span key={index} style={{ display: 'inline-block' }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section - OCCUPY 스타일 흉내 */}
      <section className="flex flex-col items-start justify-start h-screen text-center px-4 pt-16">
        <h1 ref={textRef} className="text-4xl sm:text-6xl md:text-8xl font-bold uppercase tracking-wider mb-8 text-center">
          {renderText(text)}
        </h1>
              
        <nav className="grid grid-cols-2 gap-8 max-w-md self-center">
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