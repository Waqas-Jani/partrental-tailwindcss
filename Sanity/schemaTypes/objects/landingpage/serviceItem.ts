import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'serviceItem',
  type: 'object',
  title: 'Service Item',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
    }),
  ],
})
