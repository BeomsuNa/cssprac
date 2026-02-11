import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './VisionMission.css'

gsap.registerPlugin(ScrollTrigger)

const VisionMission: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const pillarsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'top 30%',
        scrub: 1,
        markers: false,
      },
    })

    // Headline slides in from left
    if (headlineRef.current) {
      tl.fromTo(
        headlineRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        0
      )
    }

    // Body text fades in
    if (bodyRef.current) {
      tl.fromTo(
        bodyRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        0.2
      )
    }

    // Pillar cards stagger
    if (pillarsRef.current) {
      const cards = pillarsRef.current.querySelectorAll('.pillar-card')
      tl.fromTo(
        cards,
        { opacity: 0, scale: 0.8, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'back.out' },
        0.4
      )
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="vision-mission-section relative py-24 md:py-32 bg-black border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Headline */}
        <h2
          ref={headlineRef}
          className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-white"
        >
          What Powers the <span className="text-red-600">Future</span>
        </h2>

        {/* Body Copy */}
        <p
          ref={bodyRef}
          className="text-lg md:text-xl font-light text-gray-300 max-w-3xl mb-16 leading-relaxed"
        >
          We pioneer physical intelligence—perception merged with cognition, moving at the speed of tomorrow. Our systems don't just execute tasks; they understand context, adapt to complexity, and collaborate seamlessly with human teams.
        </p>

        {/* 3 Pillars */}
        <div
          ref={pillarsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Pillar 1 */}
          <div className="pillar-card p-8 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-red-600/50 transition-all duration-300">
            <div className="mb-4 text-4xl">🧠</div>
            <h3 className="text-xl font-bold uppercase tracking-wide mb-3 text-white">
              Perception + Cognition
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Advanced sensing, AI-driven learning, real-time decision-making powered by multimodal neural networks
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="pillar-card p-8 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-red-600/50 transition-all duration-300">
            <div className="mb-4 text-4xl">⚙️</div>
            <h3 className="text-xl font-bold uppercase tracking-wide mb-3 text-white">
              Precision in Motion
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Optimal trajectory planning, adaptive force control, industrial-grade stability for mission-critical operations
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="pillar-card p-8 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-red-600/50 transition-all duration-300">
            <div className="mb-4 text-4xl">🤝</div>
            <h3 className="text-xl font-bold uppercase tracking-wide mb-3 text-white">
              Human Collaboration
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Built to work alongside humans, not replace them—safer, smarter, faster augmentation of human capability
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VisionMission
