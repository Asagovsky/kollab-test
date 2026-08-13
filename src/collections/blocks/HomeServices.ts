import type { Block } from 'payload'
import type { HomeServicesProps } from '@/components/blocks/home-services/types'
import { buttonField } from '../components/Button'
import { headingField } from '../components/Heading'

export const homeServicesDefaults = {
  eyebrow: 'Our Services',
  title: {
    text: 'W*E*B3 & CRYPTO MARKETI*N*G {icon} SERVICE*S*',
    semanticTag: 'h2',
    styleTag: 'h1-md',
  },
  description:
    'We help Web3 and crypto projects build strong brands, engage communities, and scale growth.',
  services: [
    {
      title: 'Crypto Influencer Marketing',
      description:
        'We are proven to have the most elite crypto KOL network in the industry – with exclusive access to many of the biggest names.',
      action: { title: 'Explore', variant: 'tertiary', newTab: false },
    },
    {
      title: 'Social Media Marketing',
      description:
        'The lifeblood of your crypto project. We create & activate expert growth strategies that drive user interest.',
      action: { title: 'Explore', variant: 'tertiary', newTab: false },
    },
    {
      title: 'Public Relations',
      description:
        'The lifeblood of your crypto project. We create & activate expert growth strategies that drive user interest.',
      action: { title: 'Explore', variant: 'tertiary', newTab: false },
    },
    {
      title: 'KOL Rounds',
      description:
        'As one of the most renowned KOL onboarding agencies, we have raised over $2.5M+ from KOLs into Presale & OTC investments.',
      action: { title: 'Explore', variant: 'tertiary', newTab: false },
    },
    {
      title: 'SEO & Content Marketing',
      description:
        'Our analysts and writers will get your crypto content ranking high in the SERPs in order to deliver high-intent organic traffic.',
      action: { title: 'Explore', variant: 'tertiary', newTab: false },
    },
    {
      title: 'Paid Search & Social',
      description:
        'Expert strategies designed to convert interest into action. Our paid crypto advertising team optimises campaigns for maximum ROI.',
      action: { title: 'Explore', variant: 'tertiary', newTab: false },
    },
  ],
} satisfies HomeServicesProps

export const HomeServices: Block = {
  slug: 'homeServices',
  interfaceName: 'HomeServicesBlock',
  labels: {
    singular: 'Home Services',
    plural: 'Home Services',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: homeServicesDefaults.eyebrow,
    },
    headingField({
      name: 'title',
      defaultText: homeServicesDefaults.title.text,
      defaultSemanticTag: homeServicesDefaults.title.semanticTag,
      defaultStyleTag: homeServicesDefaults.title.styleTag,
    }),
    {
      name: 'description',
      type: 'textarea',
      defaultValue: homeServicesDefaults.description,
    },
    {
      name: 'services',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        buttonField({ name: 'action', defaultTitle: 'Explore', defaultVariant: 'tertiary' }),
      ],
      defaultValue: homeServicesDefaults.services,
    },
  ],
}
