import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const OrbitShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const robotRef = useRef<HTMLDivElement>(null)
  const calloutRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current || !robotRef.current) return

    // Parallax effect on scroll
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
      onUpdate: (self) => {
        if (robotRef.current) {
          gsap.to(robotRef.current, {
            y: self.getVelocity() * 0.1,
            overwrite: false,
          })
        }

        // Animate callouts
        calloutRefs.current.forEach((ref, index) => {
          if (ref) {
            const delay = index * 0.2
            gsap.to(ref, {
              opacity: Math.min(1, self.progress * 2 - delay * 0.3),
              y: (1 - self.progress) * 30,
              overwrite: false,
            })
          }
        })
      },
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="orbit-showcase-section relative py-24 md:py-32 bg-black border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-white">
            Adaptive Intelligence <span className="text-red-600">in Motion</span>
          </h2>
          <p className="text-lg text-gray-400">
            Watch how perception becomes action—scroll to reveal the architecture underneath
          </p>
        </div>

        {/* Robot Display Area */}
        <div className="relative h-96 md:h-screen flex items-center justify-center overflow-hidden">
          {/* Robot Silhouette */}
          <div
            ref={robotRef}
            className="relative w-64 h-64 md:w-full md:h-full flex items-center justify-center"
          >
            {/* Placeholder for robot image/video */}
            <div className="w-48 h-48 md:w-96 md:h-96 bg-gradient-to-b from-white/10 to-red-600/20 rounded-lg flex items-center justify-center">
              <span className="text-white/50 text-xl font-bold">ROBOT DISPLAY</span>
            </div>
          </div>

          {/* Callout 1: Sensing */}
          <div
            ref={(el) => calloutRefs.current.push(el)}
            className="absolute left-0 top-1/4 md:left-1/4 text-white opacity-0"
          >
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-red-600 rounded-full mt-2" />
              <div>
                <h3 className="font-bold uppercase tracking-wider text-sm">Sensing Layer</h3>
                <p className="text-xs text-gray-400 max-w-xs">
                  Cameras, LIDAR, IMU sensors working in concert
                </p>
              </div>
            </div>
          </div>

          {/* Callout 2: Learning */}
          <div
            ref={(el) => calloutRefs.current.push(el)}
            className="absolute right-0 top-1/2 md:right-1/4 text-white opacity-0"
          >
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-orange-600 rounded-full mt-2" />
              <div>
                <h3 className="font-bold uppercase tracking-wider text-sm">Learning Engine</h3>
                <p className="text-xs text-gray-400 max-w-xs">
                  AI processing, reinforcement learning, adaptive skills
                </p>
              </div>
            </div>
          </div>

          {/* Callout 3: Motion */}
          <div
            ref={(el) => calloutRefs.current.push(el)}
            className="absolute bottom-1/4 md:bottom-1/3 left-1/3 text-white opacity-0"
          >
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
              <div>
                <h3 className="font-bold uppercase tracking-wider text-sm">Motion Stack</h3>
                <p className="text-xs text-gray-400 max-w-xs">
                  Trajectory planning, force control, real-time optimization
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrbitShowcase
