import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Item',
  name: 'aboutItem',
  type: 'object',
  fields: [
    defineField({
      title: 'Heading',
      name: 'heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      title: 'Description',
      name: 'description',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
