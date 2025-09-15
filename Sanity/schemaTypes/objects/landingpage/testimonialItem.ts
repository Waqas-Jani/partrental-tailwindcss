import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'landingTestimonialItem',
  type: 'object',
  title: 'Testimonial Item',
  fields: [
    defineField({
      name: 'feedback',
      type: 'text',
      title: 'Feedback',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reviwerName',
      type: 'string',
      title: 'Reviewer Name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reviewerDesignation',
      type: 'string',
      title: 'Reviewer Designation',
    }),
  ],
})
