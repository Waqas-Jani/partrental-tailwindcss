import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'servicesPage',
  title: 'Services Page',
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
    prepare() {
      return {
        title: 'Services Page',
      }
    },
  },
})
