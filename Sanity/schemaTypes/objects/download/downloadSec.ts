import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'downloadSec',
  title: 'Download Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'downloads',
      title: 'Downloads',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'resource'}]}],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
