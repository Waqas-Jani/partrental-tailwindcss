export default {
  name: 'header',
  type: 'object',
  title: 'Header',
  fields: [
    {
      name: 'logo',
      type: 'figure',
      title: 'Logo 1',
      validation: (rule) => rule.required(),
    },
    {
      name: 'logo2',
      type: 'figure',
      title: 'Logo 2',
      validation: (rule) => rule.required(),
    },
    {
      name: 'menu',
      type: 'array',
      of: [{type: 'headerMenu'}],
      title: 'Site Menu',
      validation: (rule) => rule.required(),
    },
    // {
    //   name: 'phone',
    //   type: 'string',
    //   title: 'Phone',
    //   validation: (rule) => rule.required(),
    // },
    {
      name: 'button',
      type: 'button',
      title: 'Button',
      validation: (rule) => rule.required(),
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Menu',
      }
    },
  },
}
