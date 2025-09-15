import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Slideout Popup',
  name: 'slideoutPopup',
  type: 'object',
  fields: [
    defineField({
      title: 'Enable/Disable',
      name: 'enable',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to enable or disable the exit intent popup',
    }),
    defineField({
      title: 'Heading',
      name: 'heading',
      type: 'string',
      description: 'The main heading of the exit intent popup',
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'text',
      description: 'A short description to display in the popup',
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      title: 'Button',
      name: 'button',
      type: 'button',
      initialValue: {
        label: 'Call Now',
        link: 'tel:+18777407368',
      },
      validation: (rule) => rule.required(),
    }),
  ],
})
