import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Feature',
  name: 'featureItem',
  type: 'object',
  fields: [
    defineField({
      title: 'Icon',
      name: 'icon',
      type: 'string',
      options: {
        list: [
          {title: 'Agri', value: 'flaticon-agriculture-2'},
          {title: 'Industry', value: 'flaticon-industry'},
          {title: 'Agri-2', value: 'flaticon-agriculture'},
          {title: 'Tractor', value: 'flaticon-tractor'},
          {title: 'Social Care', value: 'flaticon-social-care'},
        ],
      },
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
