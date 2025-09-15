export default {
  name: 'headerMenu',
  type: 'object',
  title: 'Menu',
  fields: [
    {
      name: 'parent',
      type: 'link',
      title: 'Site Menu',
    },
    {
      name: 'childMenu',
      type: 'array',
      of: [{type: 'link'}],
      title: 'Child Menu',
    },
  ],
  preview: {
    select: {
      title: 'parent.label',
    },
  },
}
