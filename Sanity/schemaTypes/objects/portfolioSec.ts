import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Portfolio',
  name: 'portfolioSec',
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

    // defineField({
    //   title: 'List',
    //   name: 'list',
    //   type: 'array',
    //   description: 'The reference of the portfolio document. Make sure the length minimum four',
    //   of: [{type: 'reference', to: {type: 'portfolio'}}],
    //   validation: (rule) => rule.min(4),
    // }),
  ],
})
