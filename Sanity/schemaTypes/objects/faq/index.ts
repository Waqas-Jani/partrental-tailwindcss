import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  title: 'FAQ',
  name: 'faqSec',
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
      title: 'Sub Heading',
      name: 'subheading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'List',
      name: 'list',
      type: 'array',
      validation: (rule) => rule.required(),
      of: [defineArrayMember({type: 'faqItem'})],
    }),
  ],
})
