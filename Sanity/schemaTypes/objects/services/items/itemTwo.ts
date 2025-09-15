import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Service Item',
  name: 'serviceItemTwo',
  type: 'object',
  fields: [
    defineField({
      title: 'Icon',
      name: 'img',
      type: 'image',
      description: 'Icon upload as a png form',
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
      title: 'Short Description',
      name: 'description',
      type: 'string',
      validation: (rule) => rule.max(50),
    }),
    defineField({
      title: 'Slug',
      name: 'path',
      type: 'string',
      description: 'Slug/Path should be e.g /, /services, /about etc',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.icon && currentValue === undefined) return 'This is required '
          return true
        }),
    }),
  ],
})
