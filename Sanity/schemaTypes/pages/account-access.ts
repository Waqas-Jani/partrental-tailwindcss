import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Account Access Page',
  name: 'accountAccess',
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
      name: 'content',
      type: 'editor2',
      title: 'Content',
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
  ],
  preview: {
    prepare() {
      return {
        title: 'Account Access Page',
      }
    },
  },
})
