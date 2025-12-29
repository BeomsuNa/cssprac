'use client';
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Pinpage() {
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoContainerRef.current) return;

    ScrollTrigger.create({
      trigger: videoContainerRef.current,
      start: "top top",
      end: "+=500",
      pin: true,
      markers: true,
    });
  }, []);

  return (
    <div className="min-h-[400vh]">
      {/* 🎥 비디오 + 텍스트 완전 구조 */}
      <div 
        ref={videoContainerRef}
        className="fixed inset-0 z-0 h-screen w-screen overflow-hidden"
      >
        {/* 배경 비디오 */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-[0.7]"
        >
          <source src="/Bacteria_blue.mp4" type="video/mp4" />
        </video>

        {/* 검은 오버레이 */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* ✅ 텍스트 (비디오 바로 위) */}
        <div className="absolute w-screen h-screen inset-0 z-20 flex flex-col items-center justify-center text-center px-8 text-white">
          <h1 className="text-5xl md:text-7xl font-black mb-4 drop-shadow-2xl bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Welcome to
          </h1>
          <h2 className="text-3xl md:text-5xl font-light tracking-[0.3em] mb-6 drop-shadow-xl">
            Amazing Journey
          </h2>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-95 drop-shadow-lg">
            Scroll down to explore the extraordinary experience waiting for you
          </p>
        </div>
      </div>

      {/* 스크롤 테스트용 더미 콘텐츠 */}
      <section className="h-screen bg-red-900 flex items-center justify-center relative z-50">
        <h3 className="text-5xl text-white">스크롤 테스트 성공!</h3>
      </section>
      <section className="h-screen bg-blue-900 flex items-center justify-center">
        <h3 className="text-5xl text-white">비디오가 고정되고 있나요? 고정 확인 중 </h3>
      </section>
    </div>
  );
}
