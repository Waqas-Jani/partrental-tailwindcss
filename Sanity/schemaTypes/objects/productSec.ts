import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Product Section',
  name: 'productSec',
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
      title: 'List',
      name: 'list',
      type: 'array',
      description: 'The reference of the product document',
      of: [{type: 'reference', to: {type: 'product'}}],
    }),
    defineField({
      title: 'Button',
      name: 'button',
      type: 'button',
    }),
  ],
})
