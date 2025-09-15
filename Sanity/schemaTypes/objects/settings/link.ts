export default {
  name: 'link',
  type: 'object',
  title: 'Link',
  fields: [
    {
      title: 'Link Type',
      name: 'type',
      type: 'string',
      initialValue: 'internal',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Internal', value: 'internal'},
          {title: 'External', value: 'external'},
        ],
      },
    },
    {
      name: 'label',
      type: 'string',
      title: 'Label',
      validation: (rule) => rule.required(),
    },
    {
      name: 'link',
      type: 'string',
      title: 'Link',
      validation: (rule) => rule.required(),
    },
  ],
}
