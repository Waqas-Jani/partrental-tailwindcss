import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Blog',
  name: 'blogPage',
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
    }),
    defineField({
      name: 'contact',
      type: 'contactObj',
      title: 'Contact',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Blog Page',
      }
    },
  },
})
