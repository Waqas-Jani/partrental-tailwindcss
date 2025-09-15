import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Item',
  name: 'contactInfoItem',
  type: 'object',
  fields: [
    defineField({
      title: 'Icon',
      name: 'icon',
      type: 'string',
      validation: (rule) => rule.required(),
      options: {
        list: [
          {title: 'Location', value: 'flaticon-placeholder'},
          {title: 'Email', value: 'flaticon-email'},
          {title: 'Phone', value: 'flaticon-phone-call'},
        ],
      },
    }),
    defineField({
      title: 'Heading',
      name: 'heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Text',
      name: 'commonlink',
      type: 'commonlink',
    }),
  ],
})
