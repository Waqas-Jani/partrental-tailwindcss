import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Team Section',
  name: 'teamSec',
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
      title: 'Members',
      name: 'list',
      type: 'array',
      validation: (rule) => rule.required().max(4),
      of: [{type: 'reference', to: defineArrayMember({type: 'team'})}],
    }),
    defineField({
      title: 'Button',
      name: 'button',
      type: 'button',
      validation: (rule) => rule.required(),
    }),
  ],
})
