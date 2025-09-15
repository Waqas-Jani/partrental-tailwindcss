import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Contact Banner',
  name: 'contactBanner',
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
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.enable && currentValue === undefined) return 'This is required '
          return true
        }),
    }),
    defineField({
      title: 'Sub Heading',
      name: 'subheading',
      type: 'string',
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'text',
      validation: (rule) => rule.max(250),
    }),
    defineField({
      title: 'Background Image',
      name: 'bgImage',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
  ],
})
