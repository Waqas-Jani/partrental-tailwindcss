import { defineType, defineField } from 'sanity'

export default defineType({
    title: 'Blog Section',
    name: 'blogSec',
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
            validation: (rule) =>
                rule.custom((currentValue: any, { parent }: any) => {
                    if (parent?.enable && currentValue === undefined) return 'This is required '
                    return true
                }),
        }),
        defineField({
            title: 'Sub Heading',
            name: 'subheading',
            type: 'string',
        }),

        defineField({
            title: 'List',
            name: 'list',
            type: 'array',
            description: 'The reference of the blog document',
            of: [{ type: 'reference', to: { type: 'blog' } }],
        }),
        defineField({
            title: 'Button',
            name: 'button',
            type: 'button',
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
                subtitle: `Blog Section: ${selection.enable ? 'Enabled' : 'Disabled'}`,
            }
        },
    },
})
