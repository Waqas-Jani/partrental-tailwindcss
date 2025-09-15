import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Faq Item',
  name: 'faqItem',
  type: 'object',
  fields: [
    defineField({
      title: 'Question',
      name: 'question',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Answer',
      name: 'answer',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
