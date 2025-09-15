import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Banner',
  name: 'banner',
  type: 'object',
  fields: [
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
    }),
  ],
})
