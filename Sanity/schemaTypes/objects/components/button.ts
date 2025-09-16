import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'button',
    type: 'object',
    title: 'Button',
    fields: [
        defineField({
            title: 'Button Type',
            name: 'btnType',
            type: 'string',

            options: {
                list: [
                    { title: 'Primary', value: 'primary' },
                    { title: 'Secondary', value: 'secondary' },
                ],
            },
        }),
        defineField({
            title: 'Link Type',
            name: 'linkType',
            type: 'string',
            validation: (rule) =>
                rule.custom((currentValue, { parent }) => {
                    if ((parent as any)?.btnType && currentValue === undefined) return 'This is required '

                    return true
                }),
            options: {
                list: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'Internal', value: 'internal' },
                    { title: 'External', value: 'external' },
                    { title: 'Reservation', value: 'reservation' },
                    { title: 'Section Id', value: 'id' },
                ],
            },
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) =>
                rule.custom((currentValue, { parent }) => {
                    if ((parent as any)?.btnType && currentValue === undefined) return 'This is required '

                    return true
                }),
        }),
        defineField({
            name: 'link',
            title: 'Link',
            type: 'string',
            description: 'Depend on the frontend implementation',
            hidden: ({ parent }) => parent?.linkType === 'normal' || parent?.linkType === 'reservation',
        }),
    ],
})
