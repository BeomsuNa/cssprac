'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function SciFiDoors({ onOpenComplete }: { onOpenComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      delay: 1, // 1초 대기 후 시작
      onComplete: onOpenComplete // 문이 다 열리면 콜백 실행 (중요!)
    });

    tl.to([leftDoorRef.current, rightDoorRef.current], {
      // 문이 열리기 직전에 약간 덜컹거리는 효과 (선택사항)
      x: (i) => (i === 0 ? 10 : -10),
      duration: 0.1,
      repeat: 5,
      yoyo: true,
      ease: "rough({ template: none.out, strength: 1, points: 20, taper: none, randomize: true, clamp: false })"
    })
    .to(leftDoorRef.current, {
      xPercent: -100, // 왼쪽 문은 왼쪽으로 완전히 이동
      duration: 2.5,
      ease: 'power4.inOut',
    }, 'open')
    .to(rightDoorRef.current, {
      xPercent: 100, // 오른쪽 문은 오른쪽으로 완전히 이동
      duration: 2.5,
      ease: 'power4.inOut',
    }, 'open')
    // 문이 다 열리면 컨테이너 자체를 숨겨서 클릭 방해 방지
    .set(containerRef.current, { display: 'none' });

  }, { scope: containerRef });

  // SF 느낌의 문 디자인 (Tailwind + CSS 그래디언트)
  const doorStyle = "absolute top-0 w-1/2 h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-r-2 border-gray-700 shadow-2xl z-50 flex items-center justify-center after:content-[''] after:absolute after:inset-0 after:bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.2)_10px,rgba(0,0,0,0.2)_20px)]";

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full z-[100] pointer-events-none">
      {/* 왼쪽 문 */}
      <div ref={leftDoorRef} className={`${doorStyle} left-0 border-r-4 border-[#00ffcc]`}>
        <div className="text-[#00ffcc] font-mono text-2xl opacity-50 tracking-widest">SECURE GATE L-01</div>
      </div>
      {/* 오른쪽 문 */}
      <div ref={rightDoorRef} className={`${doorStyle} right-0 border-l-4 border-[#00ffcc]`}>
        <div className="text-[#00ffcc] font-mono text-2xl opacity-50 tracking-widest">SECURE GATE R-01</div>
      </div>
    </div>
  );
}