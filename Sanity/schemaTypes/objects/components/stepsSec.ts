import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'stepsSec',
  title: 'Steps Section',
  type: 'object',
  fields: [
    defineField({
      name: 'enable',
      title: 'Enable',
      type: 'boolean',
    }),
    defineField({
      title: 'Heading',
      name: 'heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Sub Heading',
      name: 'subheading',
      type: 'string',
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [defineArrayMember({type: 'stepItem'})],
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
