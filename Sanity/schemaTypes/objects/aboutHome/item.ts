import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Item',
  name: 'aboutHomeItem',
  type: 'object',
  fields: [
    defineField({
      title: 'Heading',
      name: 'heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'ID',
      name: 'id',
      type: 'string',
      description: 'ID for tab section e.g mission',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Thumb Image',
      name: 'thumb',
      type: 'figure',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Signature Image',
      name: 'sign',
      type: 'figure',
      validation: (rule) => rule.required(),
    }),
  ],
})
