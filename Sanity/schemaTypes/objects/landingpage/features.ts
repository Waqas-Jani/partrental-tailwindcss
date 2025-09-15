import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Features',
  name: 'landingFeatures',
  type: 'object',
  fields: [
    defineField({
      title: 'Enable/Disable',
      name: 'enable',
      type: 'boolean',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sectionId',
      type: 'string',
      title: 'Section ID',
      description: 'Whitespace will be automatically removed',
    }),
    defineField({
      title: 'Heading',
      name: 'heading',
      type: 'string',
      // validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'text',
    }),

    defineField({
      name: 'features',
      type: 'array',
      of: [{type: 'landingfeatureItem'}],
      title: 'Features',
      validation: (Rule) => Rule.min(2),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare() {
      return {
        title: 'Features',
      }
    },
  },
})
