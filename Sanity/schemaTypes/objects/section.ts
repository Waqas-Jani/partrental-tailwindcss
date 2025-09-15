import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Section',
  name: 'section',
  type: 'object',
  fields: [
    defineField({
      title: 'Enable/Disable',
      name: 'enable',
      type: 'boolean',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Heading',
      name: 'heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Sub Heading',
      name: 'subheading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
