import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Image Content',
  name: 'imageContent',
  type: 'object',
  fields: [
    defineField({
      title: 'Enable/Disable',
      name: 'enable',
      type: 'boolean',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Content Type',
      name: 'contentType',
      type: 'string',
      options: {
        list: [
          {
            title: 'Simple Content',
            value: 'simpleContent',
          },
          {
            title: 'Product',
            value: 'product',
          },
        ],
      },
      initialValue: 'simpleContent',
      description:
        'If Content type is set to Product, then add product variants in the Product Variants . By default, the content type is set to Simple Content',
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
      type: 'simpleBlock',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.enable && currentValue === undefined) return 'This is required '
          return true
        }),
    }),
    defineField({
      title: 'Points',
      name: 'points',
      type: 'array',
      of: [defineArrayMember({type: 'pointItem'})],
    }),
    defineField({
      title: 'Product Variants',
      name: 'productVariants',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      hidden: ({parent}) => parent?.contentType !== 'product',
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'figure',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.enable && currentValue === undefined) return 'This is required '
          return true
        }),
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
