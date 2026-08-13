'use client'

import { type RefObject } from 'react'
import { gsap, useGSAP, SplitText } from '@/lib/gsap'

export type SplitRevealOptions = {
  /** Skip the animation entirely (element stays untouched). */
  enabled?: boolean
  /** Delay the split until async content (inlined icons) is in the DOM. */
  ready?: boolean
  /** ScrollTrigger start position. */
  start?: string
  duration?: number
  /** Per-character delay. */
  stagger?: number
  delay?: number
  /** How far below the mask each character starts, in % of its own height. */
  distance?: number
  ease?: string
}

export const useSplitReveal = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  {
    enabled = true,
    ready = true,
    start = 'top 85%',
    duration = 0.8,
    stagger = 0.02,
    delay = 0,
    distance = 100,
    ease = 'power3.out',
  }: SplitRevealOptions = {},
) => {
  useGSAP(
    () => {
      const element = ref.current

      if (!element) return

      // The element ships hidden from the server to avoid a flash before the
      // reveal, so every exit path below has to make it visible again.
      const show = () => gsap.set(element, { visibility: 'visible' })

      if (!enabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        show()
        return
      }

      if (!ready) return

      show()

      // SplitText only splits text, so masked icons are collected separately and
      // merged back in document order to keep one continuous stagger.
      const orderedTargets = (chars: Element[]) => {
        const icons = element.querySelectorAll('[data-split-icon] > *')

        if (!icons.length) return chars

        const targets = new Set<Element>([...chars, ...icons])

        return Array.from(element.querySelectorAll('*')).filter((node) => targets.has(node))
      }

      // A transformed character paints on its own, so an ancestor's
      // `background-clip: text` never reaches it and the text turns invisible.
      // Re-paint the same gradient on every character, offset so the whole
      // heading still reads as one continuous gradient.
      const paintGradient = (chars: Element[]) => {
        const { backgroundImage } = getComputedStyle(element)

        if (!backgroundImage || backgroundImage === 'none') return

        const box = element.getBoundingClientRect()

        chars.forEach((char) => {
          const rect = char.getBoundingClientRect()
          const { style } = char as HTMLElement

          style.backgroundImage = backgroundImage
          style.backgroundSize = `${box.width}px ${box.height}px`
          style.backgroundPosition = `${box.left - rect.left}px ${box.top - rect.top}px`
          style.setProperty('-webkit-background-clip', 'text')
          style.backgroundClip = 'text'
          style.color = 'transparent'
        })
      }

      const split = SplitText.create(element, {
        type: 'words,chars',
        mask: 'words',
        autoSplit: true,
        onSplit: (self) => {
          const chars = self.chars.length ? self.chars : self.words

          paintGradient(chars)

          return gsap.from(orderedTargets(chars), {
            yPercent: distance,
            opacity: 0,
            duration,
            delay,
            stagger,
            ease,
            scrollTrigger: { trigger: element, start, once: true },
          })
        },
      })

      return () => split.revert()
    },
    {
      scope: ref,
      dependencies: [enabled, ready, start, duration, stagger, delay, distance, ease],
      revertOnUpdate: true,
    },
  )
}
