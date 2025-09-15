import { defineType, defineField, defineArrayMember } from 'sanity'


export const heroItem = defineType({
    title: 'Hero Item',
    name: 'heroItem',
    type: 'object',
    fields: [
        defineField({
            title: 'Background',
            name: 'bg',
            type: 'image',
            validation: (rule) => rule.required(),
        }),
        defineField({
            title: 'Heading',
            name: 'heading',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            title: 'Sub Heading',
            name: 'subheading',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
    ],
})

export default defineType({
    title: 'Hero Section',
    name: 'homeHero',
    type: 'object',
    fields: [
        defineField({
            title: 'Slider',
            name: 'slider',
            type: 'array',
            validation: (rule) => rule.required(),
            of: [defineArrayMember(heroItem)],
        }),
        defineField({
            title: 'Button 1',
            name: 'button',
            type: 'button',
            validation: (rule) => rule.required(),
            options: {
                collapsible: true,
                collapsed: true,
            },
        }),
        defineField({
            title: 'Button 2',
            name: 'button2',
            type: 'button',
            validation: (rule) => rule.required(),
            options: {
                collapsible: true,
                collapsed: true,
            },
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Hero Section',
            }
        },
    },
})
