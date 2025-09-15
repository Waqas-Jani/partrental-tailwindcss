import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'File',
  name: 'fileObj',
  type: 'object',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      title: 'Upload File',
      name: 'fileURL',
      type: 'file',
      description: 'Upload the pdf, doc, docx file',
      options: {
        accept: '.doc,.docx,.pdf',
      },
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.title && currentValue === undefined) return 'This is required'
          return true
        }),
      hidden: ({parent}) => !parent?.title,
    }),
  ],
})
