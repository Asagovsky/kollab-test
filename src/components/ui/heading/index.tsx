import { Fragment, isValidElement, type ReactNode } from 'react'
import { Icon } from '@/components/ui/icon'
import type { HeadingIcon, HeadingProps } from './types'
import styles from './styles.module.css'

const isIconSource = (icon: HeadingProps['icon']): icon is HeadingIcon =>
  typeof icon === 'object' && icon !== null && !isValidElement(icon) && 'src' in icon

const toIconNode = (icon: HeadingProps['icon']): ReactNode =>
  isIconSource(icon) ? <Icon src={icon.src} alt={icon.alt} /> : (icon as ReactNode)

const TOKEN = /(\*[^*]+\*|\{icon\})/g

const parse = (text: string, icon?: ReactNode): ReactNode =>
  text.split(TOKEN).map((part, index) => {
    if (part === '{icon}') {
      return icon ? <Fragment key={index}>{icon}</Fragment> : null
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
  className,
}: HeadingProps) => (
  <Tag
    className={[styles.heading, variant, gradient && 'gradient-text', styles[align], className]
      .filter(Boolean)
      .join(' ')}
  >
    {typeof children === 'string' ? parse(children, toIconNode(icon)) : children}
  </Tag>
)
