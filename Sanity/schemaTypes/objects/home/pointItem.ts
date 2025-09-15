import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Point Item',
  name: 'pointItem',
  type: 'object',
  fields: [
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
      validation: (rule) => rule.required(),
    }),
  ],
})
