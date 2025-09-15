import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Contact Form',
  name: 'homeContact',
  type: 'object',
  fields: [
    defineField({
      title: 'Enable/Disable',
      name: 'enable',
      type: 'boolean',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'homeForm',
      type: 'homeForm',
      title: 'Form',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    // defineField({
    //   name: 'contactInfoSec',
    //   type: 'contactInfoSec',
    //   title: 'Contact Detail',
    //   options: {
    //     collapsible: true,
    //     collapsed: true,
    //   },
    // }),
    defineField({
      name: 'mapUrl',
      type: 'url',
      title: 'Map URL',
      options: {
        collapsible: true,
        collapsed: true,
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact',
      }
    },
  },
})
