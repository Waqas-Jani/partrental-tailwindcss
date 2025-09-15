import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'social',
    type: 'object',
    title: 'Social',
    fields: [
        defineField({
            title: 'Social Icon',
            name: 'icon',
            type: 'string',
            validation: (rule) => rule.required(),
            options: {
                list: [
                    { title: 'Facebook', value: 'fa-facebook-f' },
                    { title: 'Twitter', value: 'fa-twitter' },
                    { title: 'Youtube', value: 'fa-youtube' },
                    { title: 'LinkedIn', value: 'fa-linkedin' },
                ],
            },
        }),

        defineField({
            name: 'url',
            type: 'url',
            title: 'URL',
            validation: (rule) => rule.required(),
        }),
    ],
    preview: {
        select: {
            component: 'icon',
        },
        prepare({ component }) {
            return {
                title: component,
            }
        },
    },
})
