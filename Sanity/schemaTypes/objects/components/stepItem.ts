import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'stepItem',
  title: 'Step Item',
  type: 'object',
  fields: [
    defineField({
      name: 'step',
      title: 'Step',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'step',
    },
    prepare({title, subtitle}) {
      return {
        title: title,
        subtitle: subtitle,
      }
    },
  },
})
