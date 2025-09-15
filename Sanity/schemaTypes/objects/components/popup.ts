export default {
  name: 'confirmPopup',
  type: 'object',
  title: 'Confirmation Popup',
  fields: [
    {
      title: 'Enable/Disable',
      name: 'enable',
      type: 'boolean',
      description: 'Enable/Disable the popup on frontend',
      validation: (rule) => rule.required(),
    },

    {
      name: 'message',
      type: 'colorText',
      title: 'Message',
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'link',
      type: 'commonlink',
      title: 'Button',
    },
  ],
  preview: {
    select: {
      title: 'message.text',
      media: 'image',
    },
  },
}
