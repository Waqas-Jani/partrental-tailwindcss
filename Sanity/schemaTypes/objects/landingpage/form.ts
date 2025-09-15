import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'landingForm',
  type: 'object',
  title: 'Form Section',
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
      title: 'Heading',
      name: 'heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Enable/Disable Full Name Field',
      name: 'enable_name',
      type: 'boolean',
      initialValue: true,
      description: 'By default its enabled',
    }),
    defineField({
      title: 'Enable/Disable Company Name Field',
      name: 'enable_company',
      type: 'boolean',
      initialValue: true,
      description: 'By default its enabled',
    }),
    defineField({
      title: 'Enable/Disable Phone Number Field',
      name: 'enable_phone',
      type: 'boolean',
      initialValue: true,
      description: 'By default its enabled',
    }),
    defineField({
      title: 'Enable/Disable Company Revenue Field',
      name: 'enable_revenue',
      type: 'boolean',
      initialValue: true,
      description: 'By default its enabled',
    }),
  ],
})
