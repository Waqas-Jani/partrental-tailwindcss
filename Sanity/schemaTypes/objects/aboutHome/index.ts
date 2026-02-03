import { defineType, defineField } from 'sanity'

export default defineType({
    title: 'About Us',
    name: 'aboutHome',
    type: 'object',
    fields: [
        defineField({
            title: 'Enable/Disable',
            name: 'enable',
            type: 'boolean',
            validation: (rule) => rule.required(),
        }),
        defineField({
            title: 'Heading',
            name: 'heading',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            title: 'Sub Heading',
            name: 'subheading',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            title: 'Description',
            name: 'description',
            type: 'array',
            of: [{ type: 'block' }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            title: 'Image',
            name: 'image',
            type: 'figure',
            validation: (rule) => rule.required(),
        }),
        defineField({
            title: 'Button',
            name: 'button',
            type: 'button',
            options: {
                collapsible: true,
                collapsed: true,
            },
        }),
    ],
    preview: {
        select: {
            title: 'heading',
            enable: 'enable',
        },
        prepare(selection) {
            return {
                title: selection.title,
                subtitle: `About Us: ${selection.enable ? 'Enabled' : 'Disabled'}`,
            }
        },
    },
})
