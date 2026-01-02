import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'footer',
    type: 'object',
    title: 'Footer',
    fields: [
        defineField({
            name: 'logo',
            type: 'figure',
            title: 'Logo',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'email',
            type: 'string',
            title: 'Email',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'location',
            type: 'array',
            title: 'Location',
            validation: (rule) => rule.required(),
            of: [{ type: 'link' }],
        }),
        defineField({
            name: 'aboutSection',
            type: 'object',
            title: 'About Section',
            fields: [
                {
                    name: 'heading',
                    type: 'string',
                    title: 'Section Heading',
                    validation: (rule) => rule.required(),
                },
                {
                    name: 'about',
                    type: 'text',
                    title: 'About Us',
                    validation: (rule) => rule.required(),
                },
            ],
            options: {
                collapsible: true,
                collapsed: true,
            },
        }),
        defineField({
            name: 'businessAddressSection',
            type: 'object',
            title: 'Business Address Section',
            fields: [
                {
                    name: 'heading',
                    type: 'string',
                    title: 'Section Heading',
                    validation: (rule) => rule.required(),
                },
                {
                    name: 'address',
                    type: 'text',
                    title: 'Address',
                    validation: (rule) => rule.required(),
                },
            ],
            options: {
                collapsible: true,
                collapsed: true,
            },
        }),
        defineField({
            name: 'businessHoursSection',
            type: 'object',
            title: 'Business Hours Section',
            fields: [
                {
                    name: 'heading',
                    type: 'string',
                    title: 'Section Heading',
                    validation: (rule) => rule.required(),
                },
                {
                    name: 'hours',
                    type: 'text',
                    title: 'Hours',
                    validation: (rule) => rule.required(),
                },
            ],
            options: {
                collapsible: true,
                collapsed: true,
            },
        }),
        defineField({
            name: 'menuHeading',
            type: 'string',
            title: 'Services Section Heading',
            description: 'Optional heading for the services links section'
        }),
        defineField({
            name: 'menu',
            type: 'array',
            of: [{ type: 'link' }],
            title: 'Services Links',
        }),
        defineField({
            name: 'recentNewsHeading',
            type: 'string',
            title: 'Recent News Section Heading',
            description: 'Optional heading for the recent news section'
        }),
        defineField({
            title: 'Recent News',
            name: 'news',
            type: 'array',
            // validation: (rule) => rule.required(),
            of: [{ type: 'reference', to: { type: 'blog' } }],
        }),

        defineField({
            name: 'social',
            type: 'array',
            of: [{ type: 'social' }],
            title: 'Follow On',
        }),
        defineField({
            name: 'newsletter',
            type: 'newsletter',
            title: 'Newsletter',
            validation: (rule) => rule.required(),
        }),

    ],
    preview: {
        prepare() {
            return {
                title: 'Site Menu',
            }
        },
    },
})
