import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  title: 'About Us',
  name: 'aboutus',
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
      type: 'simpleBlock',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Image 1',
      name: 'img1',
      type: 'figure',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Points',
      name: 'points',
      type: 'array',
      of: [defineArrayMember({type: 'aboutItem'})],
    }),
    defineField({
      title: 'Button',
      name: 'button',
      type: 'button',
    }),
  ],
})
