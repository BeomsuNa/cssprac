import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ProductLineup.css'

gsap.registerPlugin(ScrollTrigger)

const ProductLineup: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)

  const products = [
    {
      id: 'sentinel',
      name: 'SENTINEL',
      model: 'SYNCRO Cobot',
      tagline: 'Agile. Collaborative. Precise.',
      description: 'The collaborative arm that learns and adapts to your workflow',
      specs: [
        '7-DOF articulation',
        'Force-torque sensing',
        'Real-time adaptive control',
      ],
      useCases: ['Assembly', 'Packaging', 'Quality Inspection'],
      color: 'from-red-600/20 to-red-900/20',
    },
    {
      id: 'recon',
      name: 'RECON',
      model: 'TRAKR Quadruped',
      tagline: 'Autonomous. Mission-Ready. Agile.',
      description: 'The ground platform engineered for unpredictable environments',
      specs: [
        'Dynamic locomotion',
        'Multi-terrain capability',
        'Advanced SLAM & navigation',
      ],
      useCases: ['Infrastructure Inspection', 'Surveillance', 'Exploration'],
      color: 'from-orange-600/20 to-orange-900/20',
    },
    {
      id: 'nexus',
      name: 'NEXUS',
      model: 'ELIXIS Humanoid',
      tagline: 'Versatile. Intelligent. Purpose-Built.',
      description: 'The full-form humanoid designed for complex, human-centric tasks',
      specs: [
        'Bipedal locomotion',
        'Dexterous manipulation',
        'Multi-modal AI training',
      ],
      useCases: ['Logistics', 'Warehousing', 'Assistance', 'Manufacturing'],
      color: 'from-blue-600/20 to-blue-900/20',
    },
  ]

  useEffect(() => {
    if (!sectionRef.current || !productsRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'top 20%',
        scrub: 1,
        markers: false,
      },
    })

    // Headline
    if (headlineRef.current) {
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        0
      )
    }

    // Product cards
    const productCards = productsRef.current.querySelectorAll('.product-card')
    tl.fromTo(
      productCards,
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
      0.2
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      className="product-lineup-section relative py-24 md:py-32 bg-black border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <h2
            ref={headlineRef}
            className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-white"
          >
            Three <span className="text-red-600">Dimensions</span> of Intelligence
          </h2>
          <p className="text-lg text-gray-400">
            Each platform represents a frontier in autonomous capability
          </p>
        </div>

        {/* Product Cards */}
        <div
          ref={productsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ProductProps {
  product: {
    id: string
    name: string
    model: string
    tagline: string
    description: string
    specs: string[]
    useCases: string[]
    color: string
  }
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const specsRef = useRef<HTMLDivElement>(null)

  const handleHoverStart = () => {
    if (!specsRef.current) return
    gsap.to(specsRef.current, {
      height: 'auto',
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  const handleHoverEnd = () => {
    if (!specsRef.current) return
    gsap.to(specsRef.current, {
      height: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    })
  }

  return (
    <div
      ref={cardRef}
      className={`product-card group relative p-8 bg-gradient-to-br ${product.color} border border-white/10 cursor-pointer transition-all duration-300`}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {/* Hover lift effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {/* Title */}
        <div className="mb-4">
          <h3 className="text-3xl font-black uppercase tracking-wider text-white mb-1">
            {product.name}
          </h3>
          <p className="text-sm uppercase tracking-wider text-gray-400">
            {product.model}
          </p>
        </div>

        {/* Tagline */}
        <p className="text-red-400 font-semibold uppercase text-sm tracking-wide mb-4">
          {product.tagline}
        </p>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-6">
          {product.description}
        </p>

        {/* Specs (Hidden by default, revealed on hover) */}
        <div
          ref={specsRef}
          className="overflow-hidden opacity-0 h-0 transition-all duration-300"
        >
          <div className="border-t border-white/10 pt-4 mb-4">
            <h4 className="text-xs uppercase tracking-widest text-white font-bold mb-3">
              Key Specifications
            </h4>
            <ul className="space-y-2">
              {product.specs.map((spec, i) => (
                <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-1">•</span>
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Use Cases */}
          <div className="border-t border-white/10 pt-4">
            <h4 className="text-xs uppercase tracking-widest text-white font-bold mb-3">
              Use Cases
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.useCases.map((useCase, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 bg-red-600/20 text-red-300 border border-red-600/30 rounded"
                >
                  {useCase}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <button className="mt-6 text-sm font-bold uppercase tracking-wider text-red-400 hover:text-red-300 flex items-center gap-2 transition-colors">
          Explore {product.name}
          <span>→</span>
        </button>
      </div>
    </div>
  )
}

export default ProductLineup
