import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Feature',
  name: 'feature',
  type: 'object',
  fields: [
    defineField({
      name: 'feature',
      type: 'array',
      title: 'Feature',
      of: [defineArrayMember({type: 'featureItem'})],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Feature',
      }
    },
  },
})
