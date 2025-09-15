import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Client Feedback',
  name: 'clientSecTwo',
  type: 'object',
  fields: [
    defineField({
      title: 'Enable/Disable',
      name: 'enable',
      type: 'boolean',
      validation: (rule) => rule.required(),
    }),

    defineField({
      title: 'Feedback',
      name: 'clients',
      type: 'array',
      validation: (rule) => rule.required(),
      of: [{type: 'reference', to: defineArrayMember({type: 'client'})}],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Clients Feedback',
      }
    },
  },
})
