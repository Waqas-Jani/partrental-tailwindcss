import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'serviceSec',
  title: 'Service Section',
  type: 'object',
  fields: [
    defineField({
      name: 'enable',
      title: 'Enable',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.enable && currentValue === undefined) return 'This is required '
          return true
        }),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{type: 'serviceItem'}],
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.enable && currentValue === undefined) return 'This is required '
          return true
        }),
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'button',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],
})
