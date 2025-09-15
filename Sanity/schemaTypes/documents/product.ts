import {defineType, defineField} from 'sanity'
import {BasketIcon} from '@sanity/icons'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: BasketIcon,
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
      name: 'sku',
      title: 'SKU',
      type: 'string',
      description: 'Stock Keeping Unit',
    }),
    defineField({
      name: 'condition',
      title: 'Condition',
      type: 'string',
      description: 'Condition of the product. By default it is used.',
      initialValue: 'used',
      options: {
        list: [
          {
            title: 'Used',
            value: 'used',
          },
          {
            title: 'New',
            value: 'new',
          },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      description: 'Mark this product as featured to show it prominently',
      initialValue: false,
    }),
    defineField({
      name: 'price',
      title: 'Regular Price',
      type: 'number',
      description: 'Regular price of the product',
    }),
    defineField({
      name: 'leasePrice',
      title: 'Lease Price',
      type: 'number',
      description: 'Lease price of the product',
    }),
    defineField({
      name: 'salePrice',
      title: 'Sale Price',
      type: 'number',
      description: 'Sale price if the product is on sale',
      validation: (Rule) => Rule.precision(2),
    }),
    defineField({
      name: 'onSale',
      title: 'On Sale',
      type: 'boolean',
      description: 'Is this product currently on sale?',
      initialValue: false,
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
        },
      ],
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Important for SEO and accessibility',
            },
          ],
          options: {
            hotspot: true,
          },
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief summary of the product',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'editor2',
      description: 'Full description of the product',
    }),
    defineField({
      name: 'purchasable',
      title: 'Purchasable',
      type: 'boolean',
      description: 'Can this product be purchased?',
      initialValue: true,
    }),
    defineField({
      name: 'purchaseNote',
      title: 'Purchase Note',
      type: 'text',
      description: 'Note displayed to the customer after purchase',
    }),
    defineField({
      name: 'additionalInfo',
      title: 'Additional Information',
      type: 'array',
      description: 'Additional information about the product',
      of: [{type: 'attribute'}],
    }),
    defineField({
      name: 'categories',
      title: 'Product Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'productCategory'}]}],
    }),
    defineField({
      name: 'tags',
      title: 'Product Tags',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'productTag'}]}],
    }),
    // defineField({
    //   name: 'variants',
    //   title: 'Product Variants',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'object',
    //       fields: [
    //         {name: 'title', type: 'string', title: 'Variant Title'},
    //         {name: 'sku', type: 'string', title: 'Variant SKU'},
    //         {name: 'price', type: 'number', title: 'Variant Price'},
    //         {name: 'salePrice', type: 'number', title: 'Variant Sale Price'},
    //         {
    //           name: 'attributes',
    //           type: 'array',
    //           title: 'Variant Attributes',
    //           of: [
    //             {
    //               type: 'object',
    //               fields: [
    //                 {name: 'name', type: 'string', title: 'Attribute Name'},
    //                 {name: 'value', type: 'string', title: 'Attribute Value'},
    //               ],
    //             },
    //           ],
    //         },
    //       ],
    //       preview: {
    //         select: {
    //           title: 'title',
    //           subtitle: 'sku',
    //         },
    //       },
    //     },
    //   ],
    // }),
    defineField({
      name: 'inventoryQuantity',
      title: 'Inventory Quantity',
      type: 'number',
      description: 'Current stock quantity',
      initialValue: 0,
    }),
    // defineField({
    //   name: 'dimensions',
    //   title: 'Dimensions',
    //   type: 'object',
    //   fields: [
    //     {name: 'length', type: 'number', title: 'Length'},
    //     {name: 'width', type: 'number', title: 'Width'},
    //     {name: 'height', type: 'number', title: 'Height'},
    //     {name: 'unit', type: 'string', title: 'Unit', initialValue: 'in'},
    //   ],
    // }),
    // defineField({
    //   name: 'weight',
    //   title: 'Weight',
    //   type: 'object',
    //   fields: [
    //     {name: 'value', type: 'number', title: 'Weight'},
    //     {name: 'unit', type: 'string', title: 'Unit', initialValue: 'lb'},
    //   ],
    // }),
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
      subtitle: 'sku',
      media: 'featuredImage',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: subtitle ? `SKU: ${subtitle}` : 'No SKU',
        media,
      }
    },
  },
})
