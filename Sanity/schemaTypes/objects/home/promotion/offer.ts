import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'offerItem',
  title: 'Offer Item',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'range',
      title: 'Range',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'spendLine',
      title: 'Spend Line',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'rewardLine',
      title: 'Reward Line',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
