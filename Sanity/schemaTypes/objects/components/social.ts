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
                    { title: 'X', value: 'fa-x' },
                    { title: 'Youtube', value: 'fa-youtube' },
                    { title: 'LinkedIn', value: 'fa-linkedin' },
                    { title: 'Instagram', value: 'fa-instagram' },
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
