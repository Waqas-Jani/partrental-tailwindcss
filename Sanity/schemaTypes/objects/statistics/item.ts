import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Item',
  name: 'statisItem',
  type: 'object',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Number',
      name: 'num',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
