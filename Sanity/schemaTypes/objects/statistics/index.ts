import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Statistics',
  name: 'statistic',
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Text BG',
      name: 'textBg',
      type: 'image',
      validation: (rule) => rule.required(),
    }),

    defineField({
      title: 'List',
      name: 'list',
      type: 'array',
      validation: (rule) => rule.required().max(4),
      of: [defineArrayMember({type: 'statisItem'})],
    }),
  ],
})
