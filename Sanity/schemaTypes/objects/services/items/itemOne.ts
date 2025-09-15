import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Item',
  name: 'serviceItemOne',
  type: 'object',
  fields: [
    defineField({
      title: 'Icon',
      name: 'icon',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Heading',
      name: 'heading',
      type: 'string',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.icon && currentValue === undefined) return 'This is required '
          return true
        }),
    }),
    defineField({
      title: 'Slug',
      name: 'path',
      type: 'string',
      description: 'Slug/Path should be e.g /, /about etc',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.icon && currentValue === undefined) return 'This is required '
          return true
        }),
    }),
  ],
})
