import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'rentSubcategory',
  title: 'Rent Subcategory / Product',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'Seo',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description:
        'The Slug will be generate with the following format: /{{category}}/{{subcategory}}',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'productVariants',
      type: 'array',
      title: 'Product Variants',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      title: 'Gallery',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array',
      title: 'Page Sections',
      of: [
        {type: 'imageContent'},
        {type: 'contentSection'},
        {type: 'partnerSec'},
        {type: 'blogSec'},
        {type: 'clientSec'},
        {type: 'splitContent'},
        {type: 'stepsSec'},
        {type: 'homeContact'},
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({title, slug}) {
      return {
        title: title,
        subtitle: slug,
      }
    },
  },
})
