import type { Metadata } from 'next'
import type { Media, Page } from '@/payload-types'

export const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

type MediaValue = (number | null) | Media | undefined

// Media only resolves to an object when the query runs with depth >= 1.
const toOgImage = (image: MediaValue) => {
  if (typeof image !== 'object' || !image?.url) return undefined

  return [
    {
      url: image.url,
      width: image.width ?? undefined,
      height: image.height ?? undefined,
      alt: image.alt,
    },
  ]
}

export const toMetadata = (page?: Page): Metadata => {
  if (!page) return {}

  const { meta } = page
  const description = meta?.description ?? undefined
  const image = toOgImage(meta?.og?.image ?? meta?.image)

  // The doc title is an admin label, so it only feeds the social tags. An empty
  // SEO title leaves the tab to the site-wide default in the layout, and keys
  // are omitted rather than set to undefined, which would override that default
  // with nothing.
  const title = meta?.title || page.title

  return {
    ...(meta?.title ? { title: meta.title } : {}),
    ...(description ? { description } : {}),
    openGraph: {
      title: meta?.og?.title || title,
      description: meta?.og?.description || description,
      type: meta?.og?.type ?? 'website',
      url: `/${page.slug === 'home' ? '' : page.slug}`,
      images: image,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: meta?.og?.title || title,
      description: meta?.og?.description || description,
      images: image?.map((entry) => entry.url),
    },
  }
}
