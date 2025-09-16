import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'header',
    type: 'object',
    title: 'Header',
    fields: [
        defineField({
            name: 'logo',
            type: 'figure',
            title: 'Logo 1',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'menu',
            type: 'array',
            of: [{ type: 'headerMenu' }],
            title: 'Site Menu',
            validation: (rule) => rule.required(),
        }),

        defineField({
            name: 'button',
            type: 'button',
            title: 'Button',
            validation: (rule) => rule.required(),
            options: {
                collapsible: true,
                collapsed: true,
            },
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
