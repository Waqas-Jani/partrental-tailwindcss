import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Client Feedback',
  name: 'clientSec',
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
      // validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Feedback',
      name: 'clients',
      type: 'array',
      validation: (rule) => rule.required(),
      of: [{type: 'reference', to: defineArrayMember({type: 'client'})}],
    }),
  ],
})
