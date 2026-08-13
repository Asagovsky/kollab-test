import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { ButtonVariant } from '@/collections/components/types'

type BaseProps = {
  children: ReactNode
  variant?: ButtonVariant
  icon?: ReactNode
  newTab?: boolean
  className?: string
}

export type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & { href?: string }
