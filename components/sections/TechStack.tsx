import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TechStack: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const capabilities = [
    {
      id: 'perception',
      icon: '🔍',
      stat: '8+',
      title: 'Perception Engine',
      description: 'Visual SLAM, LIDAR odometry, IMU fusion, audio integration—comprehensive environmental awareness from multiple sensing modalities.',
      details: [
        'Camera-based visual odometry and SLAM',
        'LIDAR point cloud processing',
        'IMU-based inertial measurement',
        'Multimodal sensor fusion architecture',
      ],
    },
    {
      id: 'learning',
      icon: '🧬',
      stat: 'Sim-to-Real',
      title: 'Learning Stack',
      description: 'Isaac Gym integration, reinforcement learning, VLA (Vision Language Action) models, and continuous skill acquisition.',
      details: [
        'Large-scale simulator training (Isaac Gym)',
        'Sim-to-real transfer learning',
        'VLA-enabled policy learning',
        'Continuous skill adaptation',
      ],
    },
    {
      id: 'motion',
      icon: '🎯',
      stat: 'Real-time',
      title: 'Motion Planning',
      description: 'Trajectory generation, force-torque hybrid control, collision avoidance, and dynamic stability optimization.',
      details: [
        'Optimal path planning algorithms',
        'Hybrid force-torque control',
        'Real-time collision avoidance',
        'Dynamic stability management',
      ],
    },
    {
      id: 'integration',
      icon: '🔌',
      stat: 'API-first',
      title: 'Integration Layer',
      description: 'Programmable interfaces, custom ontologies, and modular software architecture for extensibility.',
      details: [
        'Comprehensive SDK and APIs',
        'Custom ontology support',
        'Modular plugin architecture',
        'Enterprise integration ready',
      ],
    },
  ]

  useEffect(() => {
    if (!sectionRef.current) return

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 60%',
      onEnter: () => {
        // Animate capability cards
        const cards = sectionRef.current?.querySelectorAll('.capability-card')
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
        )

        // Animate stat counters
        const stats = sectionRef.current?.querySelectorAll('.capability-stat')
        stats?.forEach((stat) => {
          const text = stat.textContent || '0'
          gsap.fromTo(
            stat,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out', delay: 0.1 }
          )
        })
      },
    })
  }, [])

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section
      ref={sectionRef}
      className="tech-stack-section relative py-24 md:py-32 bg-black border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-white">
            The <span className="text-red-600">Foundation</span> of Tomorrow
          </h2>
          <p className="text-lg text-gray-400">
            Every platform is built on a unified, modular AI and robotics stack
          </p>
        </div>

        {/* Capability Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.map((cap) => (
            <div
              key={cap.id}
              className="capability-card group relative p-8 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-red-600/50 rounded-lg overflow-hidden cursor-pointer transition-all duration-300"
              onClick={() => handleToggle(cap.id)}
            >
              {/* Icon & Title */}
              <div className="flex items-start gap-4 mb-4">
                <span className="text-5xl">{cap.icon}</span>
                <div className="flex-1">
                  <div className="capability-stat text-2xl font-black text-red-600 mb-2">
                    {cap.stat}
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-wider text-white">
                    {cap.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {cap.description}
              </p>

              {/* Details (Expandable) */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedId === cap.id ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="border-t border-white/10 pt-4">
                  <ul className="space-y-2">
                    {cap.details.map((detail, i) => (
                      <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Toggle Indicator */}
              <div className="mt-4 text-red-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                {expandedId === cap.id ? '- Hide Details' : '+ Learn More'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack
