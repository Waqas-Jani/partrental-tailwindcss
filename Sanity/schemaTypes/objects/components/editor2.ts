import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'editor2',
    type: 'array',
    title: 'Editor',
    of: [
        {
            type: 'block',
            marks: {
                annotations: [
                    {
                        name: 'link',
                        type: 'object',
                        title: 'Link',
                        fields: [
                            defineField({
                                name: 'href',
                                type: 'url',
                                validation: (Rule: any) =>
                                    Rule.uri({
                                        allowRelative: true,
                                        scheme: ['http', 'https', 'mailto', 'tel'],
                                    }),
                            }),
                        ],
                    },
                ],
            },
        },
        { type: 'figure' },
        { type: 'banner' },
        { type: 'faqSec' },
        { type: 'table' },
    ],
})
