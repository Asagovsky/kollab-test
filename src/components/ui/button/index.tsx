import type { AnchorHTMLAttributes, ReactNode } from 'react'
import type { ButtonVariant } from '@/collections/components/types'
import type { ButtonProps } from './types'
import styles from './styles.module.css'

const PixelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <rect x="2.57141" y="0.857178" width="3.42857" height="3.42857" fill="currentColor" />
    <rect x="6" y="4.28564" width="3.42857" height="3.42857" fill="currentColor" />
    <rect x="2.57141" y="7.71436" width="3.42857" height="3.42857" fill="currentColor" />
  </svg>
)

const defaultIcons: Record<ButtonVariant, () => ReactNode> = {
  primary: PixelIcon,
  secondary: PixelIcon,
  tertiary: PixelIcon,
}

export const Button = ({
  children,
  variant = 'tertiary',
  icon,
  newTab,
  className,
  href,
  ...props
}: ButtonProps) => {
  const DefaultIcon = defaultIcons[variant]

  const content = (
    <>
      <span className={styles.badge}>{icon ?? <DefaultIcon />}</span>
      <span className={`button-2 ${styles.label}`}>{children}</span>
    </>
  )

  const rootClassName = [styles.button, styles[variant], className].filter(Boolean).join(' ')

  if (href) {
    return (
      <a
        href={href}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noopener noreferrer' : undefined}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        className={rootClassName}
      >
        {content}
      </a>
    )
  }

  return (
    <button type="button" {...props} className={rootClassName}>
      {content}
    </button>
  )
}
