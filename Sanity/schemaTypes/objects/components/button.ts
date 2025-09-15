export default {
  name: 'button',
  type: 'object',
  title: 'Button',
  fields: [
    {
      title: 'Button Type',
      name: 'btnType',
      type: 'string',

      options: {
        list: [
          {title: 'Primary', value: 'primary'},
          {title: 'Secondary', value: 'secondary'},
        ],
      },
    },
    {
      title: 'Link Type',
      name: 'linkType',
      type: 'string',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.btnType && currentValue === undefined) return 'This is required '

          return true
        }),
      options: {
        list: [
          {title: 'Normal', value: 'normal'},
          {title: 'Internal', value: 'internal'},
          {title: 'External', value: 'external'},
          {title: 'Reservation', value: 'reservation'},
          {title: 'Section Id', value: 'id'},
        ],
      },
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.btnType && currentValue === undefined) return 'This is required '

          return true
        }),
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
      description: 'Depend on the frontend implementation',
      hidden: ({parent}) => parent?.linkType === 'normal' || parent?.linkType === 'reservation',
    },
  ],
}
