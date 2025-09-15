import {defineType, defineField, defineArrayMember} from 'sanity'
export default defineType({
  name: 'topBanner',
  title: 'Top Banner',
  type: 'object',
  fields: [
    defineField({
      name: 'enable',
      title: 'Enable/Disable',
      type: 'boolean',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'welcome',
      title: 'Welcome Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
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
})
