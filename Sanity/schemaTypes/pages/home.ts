import { defineType, defineField } from 'sanity'

export default defineType({
    title: 'Home',
    name: 'homePage',
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
            name: 'homeHero',
            type: 'homeHero',
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
                { type: 'aboutHome' },
                { type: 'serviceSecOne' },
                { type: 'teamSec' },
                { type: 'portfolioSec' },
                // { type: 'productSec' },
                { type: 'contactBanner' },
                { type: 'clientSec' },
                { type: 'promotionalBanner' },
                { type: 'offers', title: 'Why Choose Us' },
                { type: 'homeContact' },
                { type: 'blogSec' },
                { type: 'partnerSec' },
            ],
        }),

    ],
    preview: {
        prepare() {
            return {
                title: 'Home Page',
            }
        },
    },
})
