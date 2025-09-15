export default {
  name: 'footerLink',
  type: 'object',
  title: 'Link',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Heading',
      validation: (rule) => rule.required(),
    },
    {
      name: 'menu',
      type: 'array',
      of: [{type: 'link'}],
      title: 'Menu',
    },
  ],
}
