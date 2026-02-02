import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'sitesettings',
    type: 'document',
    title: 'Settings',

    fields: [
        defineField({
            name: 'favicon',
            type: 'image',
            title: 'Favicon',
        }),
        defineField({
            name: 'topBanner',
            title: 'Top Banner',
            type: 'topBanner',
            options: {
                collapsible: true,
                collapsed: true,
            },
        }),

        defineField({
            name: 'header',
            type: 'header',
            title: 'Header',
            validation: (rule) => rule.required(),
            options: {
                collapsible: true,
                collapsed: true,
            },
        }),
        defineField({
            name: 'footer',
            type: 'footer',
            title: 'Footer',
            validation: (rule) => rule.required(),
            options: {
                collapsible: true,
                collapsed: true,
            },
        }),
        defineField({
            name: 'statistic',
            type: 'statistic',
            title: 'Statistics',
            options: {
                collapsible: true,
                collapsed: true,
            },
        }),
        defineField({
            name: 'contact',
            type: 'contactObj',
            title: 'Contact',
            options: {
                collapsible: true,
                collapsed: true,
            },
        }),
        defineField({
            name: 'slideoutPopup',
            type: 'slideoutPopup',
            title: 'Slideout Popup',
            description: 'Configure the slideout popup that appears on 20% scroll of the page',
            options: {
                collapsed: true,
                collapsable: true,
            },
        }),
        defineField({
            name: 'exitIntentPopup',
            type: 'exitIntentPopup',
            title: 'Exit Intent Popup',
            description: 'Configure the exit intent popup that appears when users try to leave the page',
            options: {
                collapsed: true,
                collapsable: true,
            },
        }),
        defineField({
            name: 'simplePopup',
            type: 'simplePopup',
            title: 'Simple Popup',
            description: 'Configure the simple popup that appears on button click against simple popup button type',
            options: {
                collapsed: true,
                collapsable: true,
            },
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Site Setting',
            }
        },
    },
})
