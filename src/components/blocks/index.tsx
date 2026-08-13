import type { Page } from '@/payload-types'
import { HomeServices } from './home-services'

type Layout = NonNullable<Page['layout']>

export const RenderBlocks = ({ blocks }: { blocks: Layout }) => (
  <>
    {blocks.map((block) => {
      switch (block.blockType) {
        case 'homeServices':
          return <HomeServices key={block.id} {...block} />
        default:
          return null
      }
    })}
  </>
)
