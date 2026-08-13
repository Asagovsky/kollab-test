import React from 'react'
import { fontVariables } from '@/fonts'
import './styles.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
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
