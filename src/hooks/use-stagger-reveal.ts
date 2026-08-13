'use client'

import { type RefObject } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

export type StaggerRevealOptions = {
  /** Skip the animation entirely (children stay untouched). */
  enabled?: boolean
  /** Media query the reveal is limited to. */
  media?: string
  /** Class hiding the children before hydration; removed once GSAP takes over. */
  pendingClass?: string
  /** ScrollTrigger start position. */
  start?: string
  duration?: number
  /** Delay between children. */
  stagger?: number
  delay?: number
  /** How far below their resting place the children start, in px. */
  y?: number
  ease?: string
}

export const useStaggerReveal = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  {
    enabled = true,
    media = '(min-width: 768px)',
    pendingClass,
    start = 'top 80%',
    duration = 0.7,
    stagger = 0.15,
    delay = 0.3,
    y = 24,
    ease = 'power3.out',
  }: StaggerRevealOptions = {},
) => {
  useGSAP(
    () => {
      const element = ref.current

      if (!element) return

      const items = gsap.utils.toArray<HTMLElement>(element.children)

      // The children ship hidden from the server to avoid a flash before the
      // reveal; from here on GSAP owns their opacity.
      const show = () => pendingClass && element.classList.remove(pendingClass)

      show()

      if (!enabled || !items.length) return

      const reveal = gsap.matchMedia()

      // Outside the query (mobile, reduced motion) nothing is created, and
      // leaving the query reverts the tween, so the children stay visible.
      reveal.add(`${media} and (prefers-reduced-motion: no-preference)`, () => {
        gsap.from(items, {
          opacity: 0,
          y,
          duration,
          delay,
          stagger,
          ease,
          scrollTrigger: { trigger: element, start, once: true },
        })
      })

      return () => reveal.revert()
    },
    {
      scope: ref,
      dependencies: [enabled, media, pendingClass, start, duration, stagger, delay, y, ease],
      revertOnUpdate: true,
    },
  )
}
