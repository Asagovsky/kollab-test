import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import type { ServiceCardProps } from './types'
import styles from './styles.module.css'

export const ServiceCard = ({
  index,
  title,
  description,
  active,
  action,
  image,
  className,
}: ServiceCardProps) => (
  <article className={[styles.card, active && styles.active, className].filter(Boolean).join(' ')}>
    <Image
      className={styles.pattern}
      src="/images/service-card-bg-element.png"
      alt=""
      width={464}
      height={160}
      aria-hidden
    />
    <span className={styles.glow} aria-hidden />
    {image ? (
      <Image
        className={styles.image}
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 767px) 90vw, 33vw"
      />
    ) : null}

    <div className={styles.content}>
      <span className={`label ${styles.index}`}>{index}</span>
      <div className={styles.text}>
        <Heading as="h3" variant="h3" gradient className={styles.title}>
          {title}
        </Heading>
        <p className={`body-1 ${styles.description}`}>{description}</p>
      </div>
    </div>

    {action ? (
      <Button
        variant={action.variant}
        href={action.url}
        newTab={action.newTab}
        icon={action.icon}
        className={styles.action}
      >
        {action.title}
      </Button>
    ) : null}
  </article>
)
