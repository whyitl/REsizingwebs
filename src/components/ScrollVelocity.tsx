import React, { useRef, useLayoutEffect, useState } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'motion/react'
import './ScrollVelocity.css'

function useElementWidth(ref: React.RefObject<HTMLElement>): number {
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth((ref.current as HTMLElement).offsetWidth)
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [ref])

  return width
}

type VelocityMapping = { input: number[]; output: number[] }

type ScrollVelocityProps = {
  scrollContainerRef?: React.RefObject<HTMLElement>
  texts?: string[]
  velocity?: number
  className?: string
  damping?: number
  stiffness?: number
  numCopies?: number
  velocityMapping?: VelocityMapping
  parallaxClassName?: string
  scrollerClassName?: string
  parallaxStyle?: React.CSSProperties
  scrollerStyle?: React.CSSProperties
}

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = 'parallax',
  scrollerClassName = 'scroller',
  parallaxStyle,
  scrollerStyle,
}) => {
  const VelocityText: React.FC<{
    children: React.ReactNode
    baseVelocity?: number
    scrollContainerRef?: React.RefObject<HTMLElement>
    className?: string
    damping?: number
    stiffness?: number
    numCopies?: number
    velocityMapping?: VelocityMapping
    parallaxClassName?: string
    scrollerClassName?: string
    parallaxStyle?: React.CSSProperties
    scrollerStyle?: React.CSSProperties
  }> = ({
    children,
    baseVelocity = velocity,
    scrollContainerRef,
    className = '',
    damping,
    stiffness,
    numCopies,
    velocityMapping,
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle,
  }) => {
    const baseX = useMotionValue(0)
    const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {}
    const { scrollY } = useScroll(scrollOptions as any)
    const scrollVelocity = useVelocity(scrollY)
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: damping ?? 50,
      stiffness: stiffness ?? 400,
    })
    const velocityFactor = useTransform(
      smoothVelocity,
      (velocityMapping?.input || [0, 1000]) as any,
      (velocityMapping?.output || [0, 5]) as any,
      { clamp: false }
    )

    const copyRef = useRef<HTMLSpanElement | null>(null)
    const copyWidth = useElementWidth(copyRef as unknown as React.RefObject<HTMLElement>)

    function wrap(min: number, max: number, v: number) {
      const range = max - min
      const mod = (((v - min) % range) + range) % range
      return mod + min
    }

    const x = useTransform(baseX, (v) => {
      if (copyWidth === 0) return '0px'
      return `${wrap(-copyWidth, 0, v)}px`
    })

    const directionFactor = useRef(1)
    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * (baseVelocity as number) * (delta / 1000)

      if (velocityFactor.get() < 0) {
        directionFactor.current = -1
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1
      }

      moveBy += directionFactor.current * moveBy * (velocityFactor.get() as number)
      baseX.set(baseX.get() + moveBy)
    })

    const spans: React.ReactNode[] = []
    for (let i = 0; i < (numCopies as number); i++) {
      spans.push(
        <span className={className} key={i} ref={i === 0 ? (copyRef as any) : null}>
          {children}&nbsp;
        </span>
      )
    }

    return (
      <div className={parallaxClassName} style={parallaxStyle}>
        <motion.div className={scrollerClassName} style={{ x, ...(scrollerStyle || {}) }}>
          {spans}
        </motion.div>
      </div>
    )
  }

  return (
    <section>
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={index % 2 !== 0 ? -(velocity as number) : (velocity as number)}
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
        >
          {text}
        </VelocityText>
      ))}
    </section>
  )
}

export default ScrollVelocity


