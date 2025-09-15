import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Exit Intent Popup',
  name: 'exitIntentPopup',
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
      title: 'Button Text',
      name: 'buttonText',
      type: 'string',
      initialValue: 'Subscribe Now',
      description: 'Text for the submit button',
      validation: (rule) => rule.required(),
    }),
    // defineField({
    //   title: 'Caption',
    //   name: 'caption',
    //   type: 'string',
    //   description: 'Small text under the form (privacy notice, etc.)',
    //   validation: (rule) => rule.max(120),
    // }),
    defineField({
      title: 'Success Heading',
      name: 'successHeading',
      type: 'string',
      initialValue: 'Thank You!',
      description: 'Heading to show after successful submission',
    }),
    defineField({
      title: 'Success Message',
      name: 'successMessage',
      type: 'string',
      initialValue: "We've received your subscription.",
      description: 'Message to show after successful submission',
    }),
    defineField({
      name: 'note',
      type: 'editor',
      title: 'Note',
      description: 'Note to show below the form',
    }),
  ],
})
