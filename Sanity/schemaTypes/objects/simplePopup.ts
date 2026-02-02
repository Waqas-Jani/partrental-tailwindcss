import { defineType, defineField } from 'sanity'

export default defineType({
    title: 'SimplePopup',
    name: 'simplePopup',
    type: 'object',
    fields: [
        defineField({
            title: 'Heading',
            name: 'heading',
            type: 'string',
            description: 'The main heading of the simple popup',
            validation: (rule) => rule.required().max(70),
        }),
        defineField({
            title: 'Description',
            name: 'description',
            type: 'text',
            description: 'A short description to display in the popup',
        }),
        defineField({
            title: 'Message Field',
            name: 'msgField',
            type: 'string',
            description: 'Editable message field caption for simple popup (Fourth field in the form)',
        }),
        defineField({
            title: 'Button Text',
            name: 'buttonText',
            type: 'string',
            initialValue: 'Subscribe Now',
            description: 'Text for the submit button',
            validation: (rule) => rule.required(),
        }),
        defineField({
            title: 'Button 2 Text',
            name: 'button2Text',
            type: 'string',
            initialValue: 'Call Now',
            description: 'Text for the call button',
        }),
        defineField({
            title: 'Phone Number',
            name: 'phoneNumber',
            type: 'string',
            description: 'Phone number to call in the popup (should be in the format +1234567890)',
        }),


    ],
})
