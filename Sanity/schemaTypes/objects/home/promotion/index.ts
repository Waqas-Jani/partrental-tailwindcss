import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'promotionalBanner',
  title: 'Promotional Banner',
  type: 'object',
  fields: [
    defineField({
      name: 'enable',
      title: 'Enable',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'title',
      title: 'Title Part 1',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titlePart2',
      title: 'Title Part 2',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'offers',
      title: 'Offers',
      type: 'array',
      of: [
        {
          type: 'offerItem',
        },
      ],
      validation: (Rule) => Rule.required().max(3),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
    }),
  ],
})
