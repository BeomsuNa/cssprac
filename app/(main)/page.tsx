// app/page.tsx
'use client'
import { Button } from '@/components/ui/button';
import '../globals.css';
import Link from 'next/link';
import { useState, useEffect, useRef, CSSProperties } from 'react';
import { gsap } from 'gsap';

export default function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  const fulltext = "And You";
  const logo = "I AM IRONMAN";
  const textRef = useRef<HTMLHeadingElement>(null);
  const fullTextRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);



  useEffect(() => {
    const tl = gsap.timeline();

    // 단계 1: WCIC 로고 등장
    if (textRef.current) {
      const letters = textRef.current.querySelectorAll('span');
      tl.fromTo(letters, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 1, stagger: 0.1 });
      
      tl.fromTo(textRef.current, { y: -20, scale: 1 }, { y: -100, scale: 1.3, duration: 2 });
    }

    // 단계 2: fulltext 아래에서 위로 fade in
    if (fullTextRef.current) {
      tl.fromTo(fullTextRef.current, { y: -20, opacity: 0 }, { y: -80, opacity: 1, duration: 0.5 }, "+=0.2");
    }

    // 단계 3: 네비게이션 페이드인 (현재 위치 유지, 한 줄로 정렬)
    if (navRef.current) {
      tl.fromTo(navRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "+=0.1");
    }

  }, []);

  // 텍스트를 글자별로 span으로 분리
  const renderText = (text: string) => {
    // 기본 하이라이트 문자 집합 (모든 해당 문자를 강조)
    const highlightChars = new Set(['I', 'R', 'O', 'N', 'M', 'A']);

    // 인덱스 기반 하이라이트: 동일 문자가 여러 개일 때 특정 인덱스만 색을 바꾸고 싶을 때 사용
    // 예: logo의 두 A 중 하나만 강조하려면 아래에 인덱스와 색을 지정하세요.
    // 현재 예시는 인덱스 2(A)만 빨간색으로 설정합니다.
    const highlightByIndex = new Map<number, string>([[2, '#ff1a1a']]);

    const defaultColor = '#ff1a1a';

    return text.split('').map((char, index) => {
      const upper = char.toUpperCase();

      // 인덱스 기반 우선 적용
      const indexedColor = highlightByIndex.get(index);
      const isCharHighlighted = highlightChars.has(upper);

      const style: CSSProperties = {
        display: 'inline-block',
        ...(indexedColor ? { color: indexedColor } : {}),
        ...(!indexedColor && isCharHighlighted ? { color: defaultColor } : {}),
      };

      const className = indexedColor || isCharHighlighted ? 'font-extrabold' : '';

      return (
        <span key={index} className={className} style={style}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen text-white">
      {/* Cloudinary 배경 비디오 */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          src="https://res.cloudinary.com/https://player.cloudinary.com/embed/?cloud_name=dwbs7dgsd&public_id=%EC%95%84%EC%9D%B4%EC%96%B8%EB%A7%A8%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C_rl8yvp/video/upload/f_auto,q_auto,vc_auto,fl_progressive/v1/{your_public_id}"
        >
          Your browser does not support the video tag.
        </video>
        {/* 쉐도우/오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>
      </div>

      {/* 콘텐츠 섹션 */}
      <section className="relative z-10 flex flex-col items-center justify-center h-screen px-4 pt-16">
        <h1 ref={textRef} className="text-8xl sm:text-8xl md:text-8xl font-bold uppercase tracking-wider mb-8">
          {renderText(logo)}
        </h1>

        {/* 긴 텍스트 설명 */}
        <div ref={fullTextRef} className="text-sm sm:text-base md:text-lg font-light uppercase tracking-wider text-center max-w-2xl" style={{ opacity: 0 }}>
          {fulltext}
        </div>
              
        <nav ref={navRef} className="flex w-full justify-center self-center" style={{ opacity: 1}}>
          <div style={{ width: '25vw', display: 'flex', justifyContent: 'center' }}>
            <Button className="bg-transparent border border-white text-white hover:bg-white hover:text-black transition duration-300">
              <Link href="/robot">3D Image</Link>
            </Button>
          </div>

          <div style={{ width: '25vw', display: 'flex', justifyContent: 'center' }}>
            <Button className="bg-transparent border border-white text-white hover:bg-white hover:text-black transition duration-300">
              <Link href="/pinpage">Pin Page</Link>
            </Button>
          </div>

          <div style={{ width: '25vw', display: 'flex', justifyContent: 'center' }}>
            <Button className="bg-transparent border border-white text-white hover:bg-white hover:text-black transition duration-300">
              <Link href="/scrollpage">Scroll Page</Link>
            </Button>
          </div>

          <div style={{ width: '25vw', display: 'flex', justifyContent: 'center' }}>
            <Button className="bg-transparent border border-white text-white hover:bg-white hover:text-black transition duration-300">
              <Link href="/IronMan">CSS Pag</Link>
            </Button>
          </div>
        </nav>
      </section>
      <main>{children}</main>
    </div>
  );
}