import type { ReactNode } from 'react'
import type { SemanticTag, StyleTag } from '@/collections/components/types'
import type { SplitRevealOptions } from '@/hooks/use-split-reveal'

export type HeadingIcon = {
  src: string
  alt?: string
}

export type HeadingProps = {
  children: ReactNode
  as?: SemanticTag | 'p'
  variant?: StyleTag
  icon?: ReactNode | HeadingIcon
  align?: 'start' | 'center'
  gradient?: boolean
  /** Opt in to the character-by-character scroll reveal. String children only. */
  animated?: boolean
  animation?: Omit<SplitRevealOptions, 'enabled' | 'ready'>
  className?: string
}
