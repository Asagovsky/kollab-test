import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@payload-config'
import { RenderBlocks } from '@/components/blocks'

export default async function HomePage() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
    depth: 1,
  })

  const page = docs[0]

  if (!page) notFound()

  return (
    <div className="homepage">
      <RenderBlocks blocks={page.layout} />
    </div>
  )
}
