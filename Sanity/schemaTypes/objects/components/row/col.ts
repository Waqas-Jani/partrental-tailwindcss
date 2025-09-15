export default {
  name: 'col',
  title: 'Add Col',
  type: 'object',
  fields: [
    {
      title: 'How Many Columns',
      name: 'columns',
      type: 'number',
      initialValue: 1,
      description: '12 Columns are equal to full width',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 1, value: 1},
          {title: 2, value: 2},
          {title: 3, value: 3},
          {title: 4, value: 4},
          {title: 5, value: 5},
          {title: 6, value: 6},
          {title: 7, value: 7},
          {title: 8, value: 8},
          {title: 9, value: 9},
          {title: 10, value: 10},
          {title: 11, value: 11},
          {title: 12, value: 12},
        ],
      },
    },
    {
      name: 'height',
      title: 'Height',
      type: 'number',
      description: 'Height value between 0-100 and apply in percentage or vh depend on frontend',
      initialValue: 0,
      validation: (Rule) => Rule.max(100),
    },

    {
      name: 'image',
      title: 'Image',
      type: 'figure',
    },
  ],
  preview: {
    select: {
      column: 'columns',
      media: 'image',
      height: 'height',
    },
    prepare({column, media, height}) {
      return {
        title: `Number of columns: ${column}`,
        subtitle: `Height is ${height}`,
        media,
      }
    },
  },
}
