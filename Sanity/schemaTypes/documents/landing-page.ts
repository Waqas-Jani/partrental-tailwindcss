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
            name: 'topBanner',
            type: 'string',
            title: 'Top Banner Phone Number',
            validation: (rule) => rule.required(),
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
