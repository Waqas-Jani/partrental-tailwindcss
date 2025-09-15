import {defineType, defineField, defineArrayMember} from 'sanity'
import {TiersIcon} from '@sanity/icons'
export default defineType({
  name: 'team',
  title: 'Team',
  type: 'document',
  icon: TiersIcon,
  fields: [
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'figure',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'designation',
      title: 'Designation',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'social',
      title: 'Social Link',
      type: 'array',
      of: [defineArrayMember({type: 'social'})],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'photo',
    },
  },
})
