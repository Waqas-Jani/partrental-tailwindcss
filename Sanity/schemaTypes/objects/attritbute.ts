import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'attribute',
  title: 'Attribute',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      type: 'string',
      title: 'Value',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
