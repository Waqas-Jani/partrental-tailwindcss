import { findDuplicates } from '../../utils/common'
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
            validation: (rule) =>
                rule.custom((currentValue) => {
                    if (currentValue !== undefined && findDuplicates(currentValue)) {
                        return 'Duplicate section found! Only single type acceptable'
                    }
                    return true
                }),
        }),
        // defineField({
        //   name: 'feature',
        //   type: 'array',
        //   title: 'Feature',
        //   of: [defineArrayMember({type: 'feature'})],
        //   options: {
        //     collapsible: true,
        //     collapsed: true,
        //   },
        // }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Home Page',
            }
        },
    },
})
