import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Service Type Two',
  name: 'serviceSecTwo',
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
      title: 'Center Image',
      name: 'img',
      type: 'figure',
      validation: (rule) => rule.required(),
    }),

    defineField({
      title: 'Service List',
      name: 'list',
      type: 'array',
      of: [{type: 'serviceItemTwo'}],
      validation: (rule) => rule.max(6),
    }),
  ],
})
