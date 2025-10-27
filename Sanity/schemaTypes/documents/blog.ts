import { defineType, defineField } from 'sanity'
import { TiersIcon } from '@sanity/icons'

export default defineType({
    name: 'blog',
    title: 'Blog',
    type: 'document',
    icon: TiersIcon,
    initialValue: () => ({
        publishedAt: new Date().toISOString(),
        status: 'published',
    }),
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            description: 'URL-friendly version of the title',
            options: {
                source: 'title',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            description: 'Brief summary of the blog post',
        }),

        defineField({
            name: 'featuredImage',
            type: 'image',
            title: 'Featured Image',
            description: 'Main image for the blog post',
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
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'category' }] }],
            validation: (Rule) => Rule.min(1).required(),
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'tag' }] }],
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: 'author' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'publishedAt',
            type: 'datetime',
            title: 'Published at',
            description: 'This can be used to schedule post for publishing',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'modifiedAt',
            type: 'datetime',
            title: 'Last Modified at',
            description: 'When the post was last edited',
        }),
        defineField({
            name: 'content',
            type: 'editor2',
            title: 'Content',
            description: 'Main content of the blog post',
            validation: (Rule) => Rule.required(),
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
            title: 'title',
            author: 'author.name',
            media: 'featuredImage',
            status: 'status',
        },
        prepare({ title, author, media, status }) {
            return {
                title,
                // subtitle: `${status.toUpperCase()} | By: ${author || 'Unknown author'}`,
                media,
            }
        },
    },
})
