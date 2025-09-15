import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Hero',
  name: 'landingHero',
  type: 'object',
  fields: [
    defineField({
      title: 'Background',
      name: 'bg',
      type: 'image',
      validation: (rule) => rule.required(),
    }),

    defineField({
      title: 'Background Opacity',
      name: 'bgOpacity',
      type: 'color',
    }),

    defineField({
      title: 'Heading',
      name: 'heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'text',
    }),

    defineField({
      title: 'Button',
      name: 'button',
      type: 'button2',
      options: {
        collapsed: true,
        collapsable: true,
      },
    }),
    defineField({
      name: 'enableForm',
      title: 'Enable Form',
      type: 'boolean',
      initialValue: false,
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
