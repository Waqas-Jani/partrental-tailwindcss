import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'seo',
    title: 'SEO',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'keywords',
            type: 'array',
            title: 'Keywords',
            description: 'Add keywords that describes your page.',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
        }),
        defineField({
            name: 'ldSchema',
            title: 'LD Schema',
            type: 'array',
            of: [
                defineField({
                    type: 'text',
                }),
            ],
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'SEO',
            }
        },
    },
})
