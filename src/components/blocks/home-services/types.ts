import type { ButtonVariant, SemanticTag, StyleTag } from '@/collections/components/types'

export type MediaValue = number | { url?: string | null; alt?: string | null } | null

export type HomeServicesAction = {
  title: string
  variant: ButtonVariant
  url?: string | null
  newTab?: boolean | null
  customIcon?: MediaValue
}

export type HomeServicesService = {
  title: string
  description: string
  image?: MediaValue
  action: HomeServicesAction
}

export type HomeServicesProps = {
  eyebrow?: string | null
  title: {
    text: string
    semanticTag: SemanticTag
    styleTag: StyleTag
    icon?: MediaValue
  }
  description?: string | null
  services?: HomeServicesService[] | null
}
