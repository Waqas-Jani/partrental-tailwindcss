import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Only Test',
  name: 'test',
  type: 'object',
  fields: [
    defineField({
      title: 'Heading',
      name: 'heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
