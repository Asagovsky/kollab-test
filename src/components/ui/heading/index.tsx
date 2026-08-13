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

const renderPart = (part: string, key: number, icon?: ReactNode): ReactNode => {
  if (part === '{icon}') {
    return icon ? (
      <span key={key} className={styles.icon} data-split-icon aria-hidden>
        {icon}
      </span>
    ) : null
  }

  if (part.startsWith('*') && part.endsWith('*')) {
    return <i key={key}>{part.slice(1, -1)}</i>
  }

  return <Fragment key={key}>{part}</Fragment>
}

// Words are grouped before the tokens inside them are rendered: a word mixing
// plain text with a styled token becomes several inline-block units once
// SplitText runs, and the line is free to break between them — so "SERVICE*S*"
// drops its S onto the next line as soon as the copy is long enough to wrap.
// Holding each mixed word in one nowrap box removes that break opportunity.
const parse = (text: string, icon?: ReactNode): ReactNode =>
  text.split(/(\s+)/).map((chunk, index) => {
    if (!chunk.trim()) return <Fragment key={index}>{chunk}</Fragment>

    const parts = chunk.split(TOKEN).filter(Boolean)

    if (parts.length === 1) return renderPart(parts[0], index, icon)

    return (
      <span key={index} className={styles.word}>
        {parts.map((part, partIndex) => renderPart(part, partIndex, icon))}
      </span>
    )
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
