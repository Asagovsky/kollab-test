import type { CollectionConfig } from 'payload'
import { metaField } from './components/Meta'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Path segment. Use "home" for the front page.',
      },
    },
    metaField(),
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blockReferences: ['homeServices'],
      blocks: [],
    },
  ],
}
