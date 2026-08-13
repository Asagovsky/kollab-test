import { cache } from 'react'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@payload-config'
import { RenderBlocks } from '@/components/blocks'
import { toMetadata } from '@/lib/metadata'

const getHomePage = cache(async () => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
    depth: 1,
  })

  return docs[0]
})

export async function generateMetadata() {
  const page = await getHomePage()

  return toMetadata(page)
}

export default async function HomePage() {
  const page = await getHomePage()

  if (!page) notFound()

  return (
    <div className="homepage">
      <RenderBlocks blocks={page.layout} />
    </div>
  )
}
