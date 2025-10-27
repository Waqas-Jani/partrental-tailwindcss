import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Offers',
  name: 'offers',
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
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'simpleBlock',
      validation: (rule) => rule.required(),
    }),

    defineField({
      title: 'Points',
      name: 'points',
      type: 'array',
      of: [defineArrayMember({type: 'pointItem'})],
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'figure',
      options: {
        collapsible: true,
        collapsed: true,
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Button',
      name: 'button',
      type: 'button',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],
})
