import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Contact & Detail',
  name: 'contactSec',
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
      title: 'Description',
      name: 'description',
      type: 'text',
    }),
    defineField({
      title: 'Background Image',
      name: 'bg',
      type: 'image',
    }),
    defineField({
      title: 'Info List',
      name: 'list',
      type: 'array',
      of: [defineArrayMember({type: 'contactItem'})],
      validation: (rule) => rule.max(3),
    }),
  ],
})
