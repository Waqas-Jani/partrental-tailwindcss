import { defineType, defineField } from 'sanity'

export default defineType({
    title: 'Faq',
    name: 'faqPage',
    type: 'document',
    fields: [
        defineField({
            name: 'seo',
            type: 'seo',
            title: 'Seo',
            options: {
                collapsible: true,
                collapsed: true,
            },
        }),
        defineField({
            name: 'hero',
            type: 'hero',
            title: 'Hero',
            options: {
                collapsible: true,
                collapsed: true,
            },
        }),
        defineField({
            name: 'faqSec',
            type: 'faqSec',
            title: 'FAQ Section',
            options: {
                collapsible: true,
                collapsed: true,
            },
        }),

        defineField({
            name: 'button',
            type: 'button',
            title: 'Button',
            options: {
                collapsible: true,
                collapsed: true,
            },
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'FAQ Page',
            }
        },
    },
})
