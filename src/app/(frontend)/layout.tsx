import React from 'react'
import type { Metadata } from 'next'
import { fontVariables } from '@/fonts'
import { serverUrl } from '@/lib/metadata'
import './styles.css'

// Relative og:image and og:url values from the CMS resolve against this.
export const metadata: Metadata = {
  metadataBase: new URL(serverUrl),
  description:
    'We help Web3 and crypto projects build strong brands, engage communities, and scale growth.',
  title: 'TheKollab',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={fontVariables}>
      <head>
        <noscript>
          <style>{`[data-reveal], [data-reveal] > * { visibility: visible !important; opacity: 1 !important; }`}</style>
        </noscript>
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
