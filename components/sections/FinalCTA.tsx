import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FinalCTA: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const ctaContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          // Animate headline
          if (headlineRef.current) {
            gsap.fromTo(
              headlineRef.current,
              { opacity: 0, y: -40 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
            )
          }

          // Animate CTA buttons
          if (ctaContainerRef.current) {
            const buttons = ctaContainerRef.current.querySelectorAll('button, a')
            gsap.fromTo(
              buttons,
              { opacity: 0, scale: 0.8, y: 20 },
              { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'back.out', delay: 0.2 }
            )
          }
        },
      },
    })
  }, [])

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const button = e.currentTarget.querySelector('button[type="submit"]')
    if (button) {
      // Success animation
      gsap.to(button, {
        backgroundColor: '#10b981',
        duration: 0.3,
      })

      setTimeout(() => {
        gsap.to(button, {
          backgroundColor: '#dc2626',
          duration: 0.3,
        })
      }, 1500)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="final-cta-section relative py-24 md:py-32 bg-black border-t border-white/10 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-white opacity-0"
        >
          Ready to Transform <span className="text-red-600">Your Industry?</span>
        </h2>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-400 mb-12 leading-relaxed">
          Join enterprises redefining what's possible. Let's build the future together.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaContainerRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="px-8 py-4 bg-red-600 text-white font-bold uppercase text-sm tracking-wider hover:bg-red-700 transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] rounded">
            Schedule a Demo
          </button>
          <button className="px-8 py-4 border-2 border-white text-white font-bold uppercase text-sm tracking-wider hover:bg-white hover:text-black transition-all duration-300 rounded">
            Explore Developer SDK
          </button>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-lg">
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded focus:border-red-600 focus:outline-none transition-colors"
              required
            />
            <input
              type="email"
              placeholder="Work Email"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded focus:border-red-600 focus:outline-none transition-colors"
              required
            />
            <input
              type="tel"
              placeholder="Contact Number"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded focus:border-red-600 focus:outline-none transition-colors"
              required
            />
            <button
              type="submit"
              className="w-full px-4 py-3 bg-red-600 text-white font-bold uppercase text-sm tracking-wider hover:bg-red-700 transition-all duration-300 rounded"
            >
              Get In Touch
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default FinalCTA
