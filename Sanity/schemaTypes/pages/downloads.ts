import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'downloadPage',
  title: 'Downloads Page',
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
      name: 'downloadSec',
      type: 'downloadSec',
      title: 'Download Section',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'downloadCtaSec',
      type: 'downloadCtaSec',
      title: 'CTA Section',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Downloads Page',
      }
    },
  },
})
