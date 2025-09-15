import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
    title: 'Why Choose Us',
    name: 'choose',
    type: 'object',
    fields: [
        defineField({
            title: 'Enable/Disable',
            name: 'enable',
            type: 'boolean',
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
            title: 'Skill',
            name: 'skill',
            type: 'array',
            validation: (rule) => rule.max(3),
            of: [
                defineArrayMember({
                    type: "object",
                    name: "skillItem",
                    title: "Item",
                    fields: [
                        defineField({
                            title: "Heading",
                            name: "heading",
                            type: "string",
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            title: "Skill",
                            name: "skill",
                            type: "number",
                            validation: (rule) => rule.required(),
                        }),
                    ],
                }),
            ],
        }),
    ],
})
