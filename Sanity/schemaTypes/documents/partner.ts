import {defineType, defineField} from 'sanity'
import {TiersIcon} from '@sanity/icons'
export default defineType({
  name: 'partner',
  title: 'Parnter',
  type: 'document',
  icon: TiersIcon,
  fields: [
    defineField({
      name: 'org',
      title: 'Organization',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'imgColor',
      title: 'Color Image',
      type: 'figure',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'imgBlack',
      title: 'Black Image',
      type: 'figure',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'org',
      media: 'imgColor',
    },
  },
})
