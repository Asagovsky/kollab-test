import type { Field } from 'payload'
import { semanticTags, styleTags, type HeadingFieldOptions } from './types'

export const headingField = ({
  name = 'heading',
  label,
  defaultText,
  defaultSemanticTag = 'h2',
  defaultStyleTag = 'h2',
}: HeadingFieldOptions = {}): Field => ({
  name,
  type: 'group',
  label,
  interfaceName: 'HeadingField',
  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
      defaultValue: defaultText,
      admin: {
        description: 'Wrap letters in * for the pixel font, use {icon} to place the icon.',
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'PNG, SVG or GIF rendered where {icon} appears in the text.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'semanticTag',
          type: 'select',
          required: true,
          defaultValue: defaultSemanticTag,
          options: [...semanticTags],
          admin: { width: '50%' },
        },
        {
          name: 'styleTag',
          type: 'select',
          required: true,
          defaultValue: defaultStyleTag,
          options: [...styleTags],
          admin: { width: '50%' },
        },
      ],
    },
  ],
})
