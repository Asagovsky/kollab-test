import type { ReactNode } from 'react'
import type { ButtonVariant } from '@/collections/components/types'

export type ServiceCardAction = {
  title: string
  variant?: ButtonVariant
  url?: string
  newTab?: boolean
  icon?: ReactNode
}

export type ServiceCardProps = {
  index: string
  title: string
  description: string
  active?: boolean
  action?: ServiceCardAction
  image?: { src: string; alt: string }
  className?: string
}
