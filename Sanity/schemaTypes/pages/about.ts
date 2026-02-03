import { defineType, defineField } from 'sanity'

export default defineType({
    title: 'About',
    name: 'aboutPage',
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
            name: 'pageBuilder',
            type: 'array',
            title: 'Page Sections',
            of: [
                { type: 'aboutus' },
                { type: 'clientSec' },
                { type: 'teamSec' },
                { type: 'choose' },
                { type: 'partnerSec' },
            ],
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'About Page',
            }
        },
    },
})
