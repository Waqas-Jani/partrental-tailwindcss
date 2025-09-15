export default {
  name: 'footer',
  type: 'object',
  title: 'Footer',
  fields: [
    {
      name: 'logo',
      type: 'figure',
      title: 'Logo',
      validation: (rule) => rule.required(),
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email',
      validation: (rule) => rule.required(),
    },
    {
      name: 'location',
      type: 'array',
      title: 'Location',
      validation: (rule) => rule.required(),
      of: [{type: 'link'}],
    },
    {
      name: 'about',
      type: 'text',
      title: 'About Us',
      validation: (rule) => rule.required(),
    },
    {
      name: 'businessAddress',
      type: 'text',
      title: 'Business Address',
    },
    {
      name: 'businessHours',
      type: 'text',
      title: 'Business Hours',
    },

    {
      name: 'menu',
      type: 'array',
      of: [{type: 'link'}],
      title: 'Services Links',
    },
    {
      title: 'Recent News',
      name: 'news',
      type: 'array',
      // validation: (rule) => rule.required(),
      of: [{type: 'reference', to: {type: 'blog'}}],
    },

    {
      name: 'social',
      type: 'array',
      of: [{type: 'social'}],
      title: 'Follow On',
    },
    {
      name: 'newsletter',
      type: 'newsletter',
      title: 'Newsletter',
      validation: (rule) => rule.required(),
    },
    {
      name: 'cc',
      type: 'simpleBlock',
      title: 'CC',
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
