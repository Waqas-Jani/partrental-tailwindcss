import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'landingPage',
    type: 'document',
    title: 'Landing Page',
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
            name: 'pageTitle',
            type: 'string',
            title: 'Page Title',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            title: 'Page Slug',
            options: {
                source: 'pageTitle',
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'phoneBanner',
            type: 'object',
            title: 'Phone Banner',
            fields: [
                defineField({
                    name: 'phoneNumber',
                    type: 'string',
                    title: 'Phone Number',
                    description: 'This will be displayed in the landing page top banner',
                    validation: (rule) => rule.required(),
                }),
                defineField({
                    name: 'phoneLink',
                    type: 'string',
                    title: 'Phone Dial Link',
                    description: 'This will be used to dial the phone number when the button is clicked. Example: +10000000000, 0000000000 etc',
                    validation: (rule) => rule.required(),
                }),
            ],
            options: {
                collapsed: true,
                collapsible: true,
            },
        }),
        defineField({
            name: 'landingHero',
            type: 'landingHero',
            title: 'Hero Section',
            options: {
                collapsed: true,
                collapsable: true,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'landingFeatures',
            type: 'landingFeatures',
            title: 'Features Section',
            options: {
                collapsed: true,
                collapsable: true,
            },
        }),
        defineField({
            name: 'imageContent',
            type: 'imageContent',
            title: 'Image Content Section',
            options: {
                collapsed: true,
                collapsable: true,
            },
        }),
        defineField({
            name: 'serviceSec',
            type: 'serviceSec',
            title: 'Service Section',
            options: {
                collapsed: true,
                collapsable: true,
            },
        }),
        defineField({
            name: 'landingTestimonial',
            type: 'landingTestimonial',
            title: 'Testimonial Section',
            options: {
                collapsed: true,
                collapsable: true,
            },
        }),
        defineField({
            name: 'message',
            type: 'text',
            title: 'Message',
        }),
        defineField({
            name: 'landingSteps',
            type: 'landingFeatures',
            title: 'Steps Section',
            options: {
                collapsed: true,
                collapsable: true,
            },
        }),
        defineField({
            name: 'landingForm',
            type: 'landingForm',
            title: 'Form Section',
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
            name: 'note',
            type: 'editor',
            title: 'Note',
        }),
    ],
})
