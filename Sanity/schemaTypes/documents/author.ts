import {defineType, defineField} from 'sanity'
import {TiersIcon} from '@sanity/icons'

export default defineType({
  name: 'author',
  type: 'document',
  title: 'Author',
  icon: TiersIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'URL-friendly version of the name',
      options: {
        source: 'name',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
      validation: (Rule) => Rule.email(),
    }),

    defineField({
      name: 'photo',
      type: 'image',
      title: 'Photo',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'photo',
      subtitle: 'email',
    },
  },
})
