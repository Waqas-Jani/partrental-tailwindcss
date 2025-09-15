import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Listing Section',
  name: 'listingSec',
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
      description: 'Optional',
    }),

    defineField({
      title: 'List',
      name: 'list',
      type: 'array',
      of: [{type: 'serviceItemOne'}],
    }),
    defineField({
      title: 'Button',
      name: 'button',
      type: 'button',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      title: 'Button 2',
      name: 'button2',
      type: 'button',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],
})
