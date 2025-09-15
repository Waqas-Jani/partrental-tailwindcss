import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Testimonial',
  name: 'landingTestimonial',
  type: 'object',
  fields: [
    defineField({
      title: 'Enable/Disable',
      name: 'enable',
      type: 'boolean',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sectionId',
      type: 'string',
      title: 'Section ID',
      description: 'Whitespace will be automatically removed',
    }),
    defineField({
      name: 'testimonials',
      type: 'array',
      of: [{type: 'landingTestimonialItem'}],
      title: 'Testimonials',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Testimonials',
      }
    },
  },
})
