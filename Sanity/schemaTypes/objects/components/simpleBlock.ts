export default {
  name: 'simpleBlock',
  type: 'array',
  title: 'Simple Block',
  of: [
    {
      type: 'block',
      styles: [{title: 'Normal', value: 'normal'}],
      marks: {
        // decorators: [],
        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              {
                name: 'href',
                title: 'Url',
                type: 'url',
                validation: (rule) =>
                  rule.uri({
                    allowRelative: true,
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
            ],
          },
        ],
      },
    },
  ],
}
