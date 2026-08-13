import type { ReactNode } from 'react'
import type { SemanticTag, StyleTag } from '@/collections/components/types'

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
  className?: string
}
