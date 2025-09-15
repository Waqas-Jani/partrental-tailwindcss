export default {
  name: 'editor',
  type: 'array',
  title: 'Editor',
  of: [
    {
      type: 'block',

      marks: {
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
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
            ],
          },
        ],
      },
      lists: [],
    },
  ],
}

//  /skid-steers/product-1
//  /compact-tractor/product-2

//  /equipment-rental-ohio/skid-steer/product-1
//  /equipment-rental/product-2
