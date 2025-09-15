import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Service Type One',
  name: 'serviceSecOne',
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
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.enable && currentValue === undefined) return 'This is required '
          return true
        }),
    }),
    defineField({
      title: 'Sub Heading',
      name: 'subheading',
      type: 'string',
      description: 'Optional',
    }),

    defineField({
      title: 'Video Thumbnail',
      name: 'thumbnail',
      type: 'figure',
      description: 'Optional',
    }),
    defineField({
      title: 'Video URL',
      name: 'videoURL',
      type: 'url',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.thumbnail?.asset && currentValue === undefined) return 'This is required '
          return true
        }),
      hidden: ({parent}) => !parent?.thumbnail?.asset,
    }),
    defineField({
      title: 'Service List',
      name: 'list',
      type: 'array',
      of: [{type: 'serviceItemOne'}],
    }),
  ],
})
