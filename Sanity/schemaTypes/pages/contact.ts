import { defineType, defineField } from 'sanity'

export default defineType({
    title: 'Contact',
    name: 'contactPage',
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
            name: 'contactForm',
            type: 'contactForm',
            title: 'Contact Form',
            options: {
                collapsible: true,
                collapsed: true,
            },
        }),

        defineField({
            name: 'contactSec',
            type: 'contactSec',
            title: 'Contact Info',
            options: {
                collapsible: true,
                collapsed: true,
            },
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Contact Page',
            }
        },
    },
})
