import {defineType, defineField} from 'sanity'
import {TagIcon} from '@sanity/icons'

export default defineType({
  name: 'productCategory',
  title: 'Product Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{type: 'productCategory'}],
      description: 'Select parent category if this is a subcategory',
    }),

    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      description: 'Search Engine Optimization settings',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'parent.name',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: subtitle ? `Child of ${subtitle}` : 'Top level category',
        media,
      }
    },
  },
})
