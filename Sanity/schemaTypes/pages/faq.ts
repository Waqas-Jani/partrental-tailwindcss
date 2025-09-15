import {findDuplicates, findObject} from '../../utils/common'
import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Faq',
  name: 'faqPage',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'Seo',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array',
      title: 'Page Sections',
      of: [{type: 'hero'}, {type: 'clientSec'}, {type: 'contactForm'}],
      validation: (rule) =>
        rule.custom((currentValue) => {
          if (currentValue === undefined) return true
          if (findObject(currentValue, 'hero') === undefined) {
            return 'Hero section required!'
          }
          if (findDuplicates(currentValue)) {
            return 'Duplicate section found! Only single type acceptable'
          }
          return true
        }),
    }),
    defineField({
      name: 'faqSec',
      type: 'faqSec',
      title: 'FAQ Section',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'contactBg',
      type: 'image',
      title: 'Contact Background',
      description: 'This background for contact form',
    }),
    defineField({
      name: 'button',
      type: 'button',
      title: 'Button',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'FAQ Page',
      }
    },
  },
})
