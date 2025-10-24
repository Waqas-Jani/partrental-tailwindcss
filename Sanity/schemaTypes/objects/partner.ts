import { defineType, defineField } from 'sanity'

export default defineType({
    title: 'Parnter',
    name: 'partnerSec',
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
            description: 'Heading of the partners section (optional)',
        }),

        defineField({
            title: 'Partners',
            name: 'partners',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'partner' }] }],
        }),
    ],
})
