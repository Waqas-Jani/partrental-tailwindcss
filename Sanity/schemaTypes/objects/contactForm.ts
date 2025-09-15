import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Contact Form',
  name: 'contactForm',
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
      title: 'Button',
      name: 'button',
      type: 'button',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Background Image',
      name: 'bgImage',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
  ],
})
