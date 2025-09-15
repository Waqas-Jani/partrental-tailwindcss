import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Contact & Detail',
  name: 'contactInfoSec',
  type: 'object',
  fields: [
    defineField({
      title: 'Heading',
      name: 'heading',
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
      of: [defineArrayMember({type: 'contactInfoItem'})],
      validation: (rule) => rule.max(3),
    }),
  ],
})
