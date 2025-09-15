import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Split Content',
  name: 'splitContent',
  type: 'object',
  fields: [
    defineField({
      title: 'Enable/Disable',
      name: 'enable',
      type: 'boolean',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Heading Left',
      name: 'headingLeft',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Sub Heading Left',
      name: 'subheadingLeft',
      type: 'string',
    }),
    defineField({
      title: 'Description Left',
      name: 'descriptionLeft',
      type: 'simpleBlock',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Points Left',
      name: 'pointsLeft',
      type: 'array',
      of: [defineArrayMember({type: 'pointItem'})],
    }),
    defineField({
      title: 'Button Left',
      name: 'buttonLeft',
      type: 'button',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      title: 'Heading Right',
      name: 'headingRight',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Sub Heading Right',
      name: 'subheadingRight',
      type: 'string',
    }),
    defineField({
      title: 'Description Right',
      name: 'descriptionRight',
      type: 'simpleBlock',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Points Right',
      name: 'pointsRight',
      type: 'array',
      of: [defineArrayMember({type: 'pointItem'})],
    }),
    defineField({
      title: 'Button Right',
      name: 'buttonRight',
      type: 'button',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'headingLeft',
      subtitle: 'subheadingLeft',
    },
    prepare({headingLeft, subtitle}) {
      return {
        title: headingLeft,
        subtitle: subtitle,
      }
    },
  },
})
