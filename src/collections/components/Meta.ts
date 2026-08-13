import type { Field } from 'payload'
import { ogTypes, type MetaFieldOptions } from './types'

export const metaField = ({ name = 'meta', label = 'SEO' }: MetaFieldOptions = {}): Field => ({
  name,
  type: 'group',
  label,
  interfaceName: 'MetaField',
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Browser tab and search result title. Falls back to the page title.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      maxLength: 200,
      admin: {
        description: 'Search result snippet. Around 150 characters reads best.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Shared when the page is linked. 1200x630 or wider.',
      },
    },
    {
      name: 'og',
      type: 'group',
      label: 'Open Graph',
      admin: {
        description: 'Only fill these in to differ from the SEO fields above.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'title', type: 'text', admin: { width: '50%' } },
            {
              name: 'type',
              type: 'select',
              required: true,
              defaultValue: 'website',
              options: [...ogTypes],
              admin: { width: '50%' },
            },
          ],
        },
        { name: 'description', type: 'textarea', maxLength: 200 },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
})
