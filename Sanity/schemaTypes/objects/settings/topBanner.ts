import { defineType, defineField, defineArrayMember } from 'sanity'
export default defineType({
    name: 'topBanner',
    title: 'Top Banner',
    type: 'object',
    fields: [
        defineField({
            name: 'enable',
            title: 'Enable/Disable',
            type: 'boolean',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'welcome',
            title: 'Welcome Text',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'phoneLink',
            title: 'Phone Dial Link',
            description: 'This will be used to dial the phone number when the button is clicked. Example: +10000000000, 0000000000 etc',
            type: 'string',
            validation: (rule) => rule.required(),
        }),

        defineField({
            name: 'social',
            title: 'Social Link',
            type: 'array',
            of: [defineArrayMember({ type: 'social' })],
        }),
    ],
})
