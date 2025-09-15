import {findDuplicates, findObject} from '../../utils/common'
import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'About',
  name: 'aboutPage',
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
      of: [
        {type: 'hero'},
        {type: 'aboutus'},
        {type: 'clientSec'},
        {type: 'teamSec'},
        {type: 'choose'},
        {type: 'partnerSec'},
      ],
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
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page',
      }
    },
  },
})
