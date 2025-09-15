export default {
  name: 'row',
  title: 'Add Row',
  type: 'object',
  fields: [
    {
      name: 'col',
      title: 'Add Columns',
      type: 'array',
      of: [{type: 'col'}],
      description: 'The grid system layout for images',
    },
    {
      name: 'gapx',
      title: 'Horizontal Gap',
      type: 'number',
      initialValue: 0,
      description: 'Gap will apply in PX',
      validation: (Rule) => Rule.max(100),
      hidden: ({parent}) => parent?.col?.length <= 1 || parent?.col === undefined,
    },
    {
      name: 'gapy',
      title: 'Vertical Gap',
      type: 'number',
      initialValue: 0,
      description: 'Gap will apply in PX',
      validation: (Rule) => Rule.max(100),
      hidden: ({parent}) => parent?.col?.length <= 1 || parent?.col === undefined,
    },
  ],
  preview: {
    select: {
      column: `col`,
    },
    prepare({column}) {
      return {
        title: `Number of images/columns: ${column ? column.length : '0'}`,
      }
    },
  },
}
