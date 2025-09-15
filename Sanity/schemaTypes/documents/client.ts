import {defineType, defineField} from 'sanity'
import {TiersIcon} from '@sanity/icons'
export default defineType({
  name: 'client',
  title: 'Client',
  type: 'document',
  icon: TiersIcon,
  fields: [
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'figure',
      // validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'designation',
      title: 'Designation',
      type: 'string',
      // validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'feedback',
      title: 'Feedback',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'photo',
    },
  },
})
