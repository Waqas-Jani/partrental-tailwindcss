import { defineType, defineField } from 'sanity'

export default defineType({
    title: 'Contact Form',
    name: 'homeContact',
    type: 'object',
    fields: [
        defineField({
            title: 'Enable/Disable',
            name: 'enable',
            type: 'boolean',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'homeForm',
            type: 'homeForm',
            title: 'Form',
            options: {
                collapsible: true,
                collapsed: true,
            },
        }),
        defineField({
            name: 'mapUrl',
            type: 'url',
            title: 'Map URL',
            validation: (rule) => rule.required(),
        }),
    ],
    preview: {
        select: {

            enable: 'enable',
        },
        prepare(selection) {
            return {
                title: "Contact",
                subtitle: `Contact: ${selection.enable ? 'Enabled' : 'Disabled'}`,
            }
        },
    },
})
