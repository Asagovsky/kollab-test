'use client'

import { Fragment, isValidElement, useRef, useState, type ReactNode, type Ref } from 'react'
import { Icon } from '@/components/ui/icon'
import { useSplitReveal } from '@/hooks/use-split-reveal'
import type { HeadingIcon, HeadingProps } from './types'
import styles from './styles.module.css'

const isIconSource = (icon: HeadingProps['icon']): icon is HeadingIcon =>
  typeof icon === 'object' && icon !== null && !isValidElement(icon) && 'src' in icon

const toIconNode = (icon: HeadingProps['icon'], onReady: () => void): ReactNode =>
  isIconSource(icon) ? (
    <Icon src={icon.src} alt={icon.alt} onReady={onReady} />
  ) : (
    (icon as ReactNode)
  )

const TOKEN = /(\*[^*]+\*|\{icon\})/g

const parse = (text: string, icon?: ReactNode): ReactNode =>
  text.split(TOKEN).map((part, index) => {
    if (part === '{icon}') {
      return icon ? (
        <span key={index} className={styles.icon} data-split-icon aria-hidden>
          {icon}
        </span>
      ) : null
    }

    if (part.startsWith('*') && part.endsWith('*')) {
      return <i key={index}>{part.slice(1, -1)}</i>
    }

    return <Fragment key={index}>{part}</Fragment>
  })

export const Heading = ({
  children,
  as: Tag = 'h2',
  variant = 'h1-md',
  icon,
  align = 'start',
  gradient = false,
  animated = false,
  animation,
  className,
}: HeadingProps) => {
  const ref = useRef<HTMLElement>(null)
  const [iconReady, setIconReady] = useState(() => !isIconSource(icon))
  const reveals = animated && typeof children === 'string'

  useSplitReveal(ref, { ...animation, enabled: reveals, ready: iconReady })

  return (
    <Tag
      ref={ref as Ref<HTMLHeadingElement>}
      data-reveal={reveals ? '' : undefined}
      className={[
        styles.heading,
        variant,
        gradient && 'gradient-text',
        styles[align],
        reveals && styles.pending,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {typeof children === 'string'
        ? parse(children, toIconNode(icon, () => setIconReady(true)))
        : children}
    </Tag>
  )
}
