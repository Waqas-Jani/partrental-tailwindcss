import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Content With Heading',
  name: 'paragraph',
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
      title: 'Description',
      name: 'description',
      type: 'simpleBlock',
    }),
  ],
})
