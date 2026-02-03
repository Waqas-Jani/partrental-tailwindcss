import { defineType, defineField } from 'sanity'

export default defineType({
    title: 'Portfolio',
    name: 'portfolioSec',
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
    ],
    preview: {
        select: {
            title: 'heading',
            enable: 'enable',
        },
        prepare(selection) {
            return {
                title: selection.title,
                subtitle: `Portfolio: ${selection.enable ? 'Enabled' : 'Disabled'}`,
            }
        },
    },
})
