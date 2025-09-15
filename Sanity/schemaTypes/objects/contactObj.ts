import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Contact',
  name: 'contactObj',
  type: 'object',
  fields: [
    defineField({
      title: 'Enable/Disable',
      name: 'enable',
      type: 'boolean',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Phone',
      name: 'phone',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Email',
      name: 'email',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Button',
      name: 'button',
      type: 'button',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Background',
      name: 'bg',
      type: 'image',
    }),
  ],
})
