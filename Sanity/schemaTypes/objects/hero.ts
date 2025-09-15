import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Hero',
  name: 'hero',
  type: 'object',
  fields: [
    defineField({
      title: 'Background',
      name: 'bg',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    // defineField({
    //   title: 'Logo',
    //   name: 'logo',
    //   type: 'figure',
    //   validation: (rule) => rule.required(),
    // }),
    defineField({
      title: 'Heading',
      name: 'heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Optional',
    }),
    defineField({
      title: 'Enable/Disable',
      name: 'isBreadcrumb',
      type: 'boolean',
      description: 'Enable/Disable the breadcrumb',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'button',
      type: 'button',
      title: 'Button',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'button2',
      type: 'button',
      title: 'Button 2',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'bg',
    },
    prepare({media}) {
      return {
        title: 'Hero',
        media: media,
      }
    },
  },
})
