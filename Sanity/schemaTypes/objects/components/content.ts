import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Content Section',
  name: 'contentSection',
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Points',
      name: 'points',
      type: 'array',
      of: [defineArrayMember({type: 'pointItem'})],
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
