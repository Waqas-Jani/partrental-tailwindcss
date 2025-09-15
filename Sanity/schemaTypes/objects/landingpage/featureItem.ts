import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'landingfeatureItem',
  type: 'object',
  title: 'Feature Item',
  fields: [
    defineField({
      name: 'icon',
      type: 'image',
      title: 'Icon',
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'text',
    }),
  ],
})
