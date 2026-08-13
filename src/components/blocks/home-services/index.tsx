'use client'

import { useState, useSyncExternalStore } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Heading } from '@/components/ui/heading'
import { ServiceCard } from '@/components/ui/service-card'
import type { ServiceCardAction } from '@/components/ui/service-card/types'
import type {
  HomeServicesAction,
  HomeServicesProps,
  HomeServicesService,
  MediaValue,
} from './types'
import styles from './styles.module.css'

const FALLBACK_ICON = '/icons/heading-star.svg'
const MOBILE_QUERY = '(max-width: 767px)'

const toImage = (image: MediaValue | undefined, fallbackAlt: string) =>
  typeof image === 'object' && image?.url
    ? { src: image.url, alt: image.alt ?? fallbackAlt }
    : undefined

const toAction = (action: HomeServicesAction): ServiceCardAction => {
  const customIcon = toImage(action.customIcon, '')

  return {
    title: action.title,
    variant: action.variant,
    url: action.url ?? undefined,
    newTab: action.newTab ?? undefined,
    icon: customIcon ? <img src={customIcon.src} alt={customIcon.alt} /> : undefined,
  }
}

const subscribeToMobile = (onChange: () => void) => {
  const query = window.matchMedia(MOBILE_QUERY)

  query.addEventListener('change', onChange)

  return () => query.removeEventListener('change', onChange)
}

const useIsMobile = () =>
  useSyncExternalStore(
    subscribeToMobile,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  )

export const HomeServices = ({ eyebrow, title, description, services = [] }: HomeServicesProps) => {
  const icon = toImage(title.icon, '') ?? { src: FALLBACK_ICON, alt: '' }
  const isMobile = useIsMobile()
  const [activeIndex, setActiveIndex] = useState(0)
  const items = services ?? []

  const renderCard = (service: HomeServicesService, index: number, active: boolean) => (
    <ServiceCard
      key={service.title}
      index={String(index + 1).padStart(2, '0')}
      title={service.title}
      description={service.description}
      active={active}
      action={toAction(service.action)}
      image={toImage(service.image, service.title)}
      className={styles.card}
    />
  )

  return (
    <section className={styles.section}>
      <img className={styles.dots} src="/images/services-bg.png" alt="" aria-hidden />
      <img className={styles.glow} src="/images/services-bg2.png" alt="" aria-hidden />

      <div className={`container ${styles.inner}`}>
        <header className={styles.header}>
          {eyebrow ? <span className={`label ${styles.eyebrow}`}>{eyebrow}</span> : null}
          <Heading
            as={title.semanticTag}
            variant={title.styleTag}
            align="center"
            icon={<img src={icon.src} alt={icon.alt} />}
            gradient
            className={styles.title}
          >
            {title.text}
          </Heading>
          {description ? <p className={`body-1 ${styles.description}`}>{description}</p> : null}
        </header>

        {isMobile ? (
          <Swiper
            className={styles.slider}
            slidesPerView="auto"
            spaceBetween={12}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            {items.map((service, index) => (
              <SwiperSlide key={service.title} className={styles.slide}>
                {renderCard(service, index, index === activeIndex)}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={styles.grid}>
            {items.map((service, index) => renderCard(service, index, index === 0))}
          </div>
        )}
      </div>
    </section>
  )
}
