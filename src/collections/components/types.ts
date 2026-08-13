export const buttonVariants = ['primary', 'secondary', 'tertiary'] as const
export const semanticTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const
export const styleTags = ['h1', 'h1-md', 'h1-sm', 'h2', 'h3', 'h4', 'h5', 'h6'] as const
export const ogTypes = ['website', 'article', 'profile'] as const

export type ButtonVariant = (typeof buttonVariants)[number]
export type SemanticTag = (typeof semanticTags)[number]
export type StyleTag = (typeof styleTags)[number]
export type OgType = (typeof ogTypes)[number]

export type ButtonFieldOptions = {
  name?: string
  label?: string
  defaultTitle?: string
  defaultVariant?: ButtonVariant
}

export type MetaFieldOptions = {
  name?: string
  label?: string
}

export type HeadingFieldOptions = {
  name?: string
  label?: string
  defaultText?: string
  defaultSemanticTag?: SemanticTag
  defaultStyleTag?: StyleTag
}
