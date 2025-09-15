import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Contact Form',
  name: 'homeForm',
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Button',
      name: 'button',
      type: 'button',
      validation: (rule) => rule.required(),
    }),
  ],
})
