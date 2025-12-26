"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function StickyIntroPage() {
  const stickyWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!stickyWrapRef.current || !videoRef.current) return;

    // 비디오 자동 재생
    videoRef.current.play();

    // Sticky 배경 설정
    ScrollTrigger.create({
      trigger: stickyWrapRef.current,
      start: "top top",
      end: "bottom top",
      pin: stickyWrapRef.current,
      pinSpacing: true,
      scrub: true,
      anticipatePin: 1,
    });

    // 텍스트 애니메이션 (배경 위로 부드럽게 등장)
    gsap.fromTo(
      textRef.current,
      {
        y: 100,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: stickyWrapRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 2,
        },
      }
    );
  }, { scope: stickyWrapRef });

  return (
    <>
      {/* Sticky Intro Section */}
      <section className="sc-intro relative min-h-screen">
        <div ref={stickyWrapRef} className="sticky-wrap h-screen w-full overflow-hidden">
          {/* 배경 비디오 */}
          <div className="intro__bg absolute inset-0 w-full h-full">
            <video
              ref={videoRef}
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              poster="/assets/images/intro-poster.jpg"
            >
              <source src="/assets/video/intro-bg.mp4" type="video/mp4" />
            </video>
          </div>

          {/* 앞에 오는 텍스트 */}
          <div
            ref={textRef}
            className="group-intro-text absolute inset-0 flex flex-col justify-center items-center text-center text-white px-8 z-10"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent drop-shadow-2xl">
              Welcome to
            </h1>
            <h2 className="text-3xl md:text-5xl font-light tracking-widest mb-8 drop-shadow-xl">
              Amazing Journey
            </h2>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90 drop-shadow-lg">
              Scroll down to explore the extraordinary experience waiting for you
            </p>
          </div>
        </div>
      </section>

      {/* 다음 콘텐츠들 */}
      <section className="h-screen bg-gradient-to-b from-slate-900 to-black flex items-center justify-center">
        <h3 className="text-4xl text-white">다음 콘텐츠 영역</h3>
      </section>
      <section className="h-screen bg-slate-800 flex items-center justify-center">
        <h3 className="text-4xl text-white">더 많은 콘텐츠...</h3>
      </section>
    </>
  );
}
