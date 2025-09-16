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
            name: 'about',
            type: 'text',
            title: 'About Us',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'businessAddress',
            type: 'text',
            title: 'Business Address',
        }),
        defineField({
            name: 'businessHours',
            type: 'text',
            title: 'Business Hours',
        }),

        defineField({
            name: 'menu',
            type: 'array',
            of: [{ type: 'link' }],
            title: 'Services Links',
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
