import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'locationService',
  title: 'Services By Location',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'Seo',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hero',
      type: 'hero',
      title: 'Hero',
      options: {
        collapsible: true,
        collapsed: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mapURL',
      type: 'url',
      title: 'Map URL',
      // validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      type: 'string',
      title: 'Address',
      // validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      type: 'string',
      title: 'Phone',
      // validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      type: 'email',
      title: 'Email',
      // validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'workingHours',
      type: 'text',
      title: 'Working Hours',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array',
      title: 'Page Sections',
      of: [
        {type: 'imageContent'},
        {type: 'contentSection'},
        {type: 'partnerSec'},
        {type: 'blogSec'},
        {type: 'clientSec'},
        {type: 'splitContent'},
        {type: 'stepsSec'},
        {type: 'homeContact'},
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({title, slug}) {
      return {
        title: title,
        subtitle: slug,
      }
    },
  },
})
