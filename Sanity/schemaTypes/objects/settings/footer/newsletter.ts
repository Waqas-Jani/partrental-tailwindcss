import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Newsletter',
  name: 'newsletter',
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
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.enable && currentValue === undefined) return 'This is required '

          return true
        }),
      hidden: ({parent}) => !parent?.enable,
    }),
    defineField({
      title: 'Button',
      name: 'button',
      type: 'button',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.enable && currentValue === undefined) return 'This is required '

          return true
        }),
      hidden: ({parent}) => !parent?.enable,
    }),
  ],
})
