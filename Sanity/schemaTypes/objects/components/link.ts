export default {
  name: 'commonlink',
  type: 'object',
  title: 'Link',
  fields: [
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      initialValue: 'internal',
      description: 'If there is no type selected then button hide on frontend',
      options: {
        list: [
          {title: 'Text', value: 'text'},
          {title: 'Internal', value: 'internal'},
          {title: 'External', value: 'external'},
        ],
      },
    },
    {
      name: 'label',
      type: 'string',
      title: 'Label',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.type && currentValue === undefined) return 'This is required'

          return true
        }),
      hidden: ({parent}) => !parent?.type,
    },
    {
      name: 'path',
      type: 'string',
      title: 'Slug/Link',
      description:
        'Enter page slug or external link and also mailto:example@exampe.com, tel:0000000 etc',
      validation: (rule) =>
        rule.custom((currentValue, {parent}) => {
          if (parent?.type && parent?.type !== 'text' && currentValue === undefined)
            return 'This is required'

          return true
        }),
      hidden: ({parent}) => parent?.type === 'text',
    },
  ],
}
