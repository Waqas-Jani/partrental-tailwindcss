import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Item',
  name: 'contactItem',
  type: 'object',
  fields: [
    defineField({
      title: 'Info Type',
      name: 'infoType',
      type: 'string',
      validation: (rule) => rule.required(),
      options: {
        list: [
          {title: 'Location', value: 'location'},
          {title: 'Email', value: 'email'},
          {title: 'Phone', value: 'phone'},
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
      name: 'text',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
  ],
})
