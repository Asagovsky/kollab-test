import type { Field } from 'payload'
import { buttonVariants, type ButtonFieldOptions } from './types'

export const buttonField = ({
  name = 'button',
  label,
  defaultTitle,
  defaultVariant = 'tertiary',
}: ButtonFieldOptions = {}): Field => ({
  name,
  type: 'group',
  label,
  interfaceName: 'ButtonField',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: defaultTitle,
          admin: { width: '50%' },
        },
        {
          name: 'variant',
          type: 'select',
          required: true,
          defaultValue: defaultVariant,
          options: [...buttonVariants],
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'url',
          type: 'text',
          admin: { width: '50%' },
        },
        {
          name: 'newTab',
          type: 'checkbox',
          defaultValue: false,
          label: 'Open in new tab',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'customIcon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'PNG, SVG or GIF replacing the default icon of the selected variant.',
      },
    },
  ],
})
