'use client'

import { useEffect, useRef, useState } from 'react'
import type { IconProps } from './types'

const isSvg = (src: string) => /\.svg(\?.*)?$/i.test(src)

const cache = new Map<string, string>()

export const Icon = ({ src, alt = '', className, onReady }: IconProps) => {
  const [loaded, setLoaded] = useState<{ src: string; markup?: string }>(() => ({
    src,
    markup: cache.get(src),
  }))
  const onReadyRef = useRef(onReady)

  const markup = loaded.src === src ? loaded.markup : cache.get(src)

  useEffect(() => {
    onReadyRef.current = onReady
  }, [onReady])

  useEffect(() => {
    if (!isSvg(src) || markup) onReadyRef.current?.()
  }, [src, markup])

  useEffect(() => {
    if (!isSvg(src) || cache.has(src)) return

    let active = true

    fetch(src)
      .then((response) => (response.ok ? response.text() : ''))
      .then((text) => {
        if (!text.trim().startsWith('<svg')) return

        cache.set(src, text)

        if (active) setLoaded({ src, markup: text })
      })
      .catch(() => {})

    return () => {
      active = false
    }
  }, [src])

  if (isSvg(src) && markup) {
    return (
      <span
        className={className}
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        dangerouslySetInnerHTML={{ __html: markup }}
      />
    )
  }

  // Plain <img> on purpose: this branch covers arbitrary CMS sources whose
  // intrinsic size is unknown, and it also serves the svg path until the markup
  // is fetched. next/image needs dimensions or a positioned parent, neither of
  // which an icon caller is required to provide.
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} src={src} alt={alt} />
}
