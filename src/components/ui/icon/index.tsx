'use client'

import { useEffect, useState } from 'react'
import type { IconProps } from './types'

const isSvg = (src: string) => /\.svg(\?.*)?$/i.test(src)

const cache = new Map<string, string>()

export const Icon = ({ src, alt = '', className }: IconProps) => {
  const [markup, setMarkup] = useState(() => cache.get(src))

  useEffect(() => {
    if (!isSvg(src) || cache.has(src)) {
      setMarkup(cache.get(src))
      return
    }

    let active = true

    fetch(src)
      .then((response) => (response.ok ? response.text() : ''))
      .then((text) => {
        if (!text.trim().startsWith('<svg')) return

        cache.set(src, text)

        if (active) setMarkup(text)
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

  return <img className={className} src={src} alt={alt} />
}
