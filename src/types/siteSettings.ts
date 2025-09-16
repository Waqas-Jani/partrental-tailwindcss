/* eslint-disable @typescript-eslint/no-explicit-any */

import { SanityImage, SanityButton } from './common'


export interface SocialLink {
    icon: string
    url: string
}

// Top Banner types
export interface TopBanner {
    enable: boolean
    welcome: string
    phone: string
    social: SocialLink[]
}

// Header types
export interface HeaderMenuChild {
    type: 'internal' | 'external'
    link: string
    label: string
}

export interface HeaderMenuParent {
    label: string
    link: string
    type: 'internal' | 'external'
}

export interface HeaderMenuItem {
    parent: HeaderMenuParent
    childMenu: HeaderMenuChild[]
}

export interface Header {
    logo: SanityImage
    button: SanityButton
    menu: HeaderMenuItem[]
}

// Footer types
export interface FooterLocation {
    label: string
    link: string
    type: 'internal' | 'external'
}

export interface FooterMenuItem {
    label: string
    link: string
    type: 'internal' | 'external'
}

export interface FooterNewsletter {
    enable: boolean
    heading: string
    button: SanityButton
}

export interface Footer {
    logo: SanityImage
    about: string
    email: string
    location: FooterLocation[]
    menu: FooterMenuItem[]
    businessAddress: string
    businessHours: string
    newsletter: FooterNewsletter
    social: SocialLink[]
}

// Popup types
export interface ExitIntentPopup {
    enable: boolean
    heading: string
    description: string
    buttonText: string
    caption: string
    successHeading: string
    successMessage: string
    note: string
}

export interface SlideoutPopup {
    enable: boolean
    heading: string
    description: string
    button: SanityButton
}

// Blog types
export interface BlogSlug {
    current: string
}

export interface BlogFeaturedImage {
    alt?: string
    asset: {
        url: string
    }
}

export interface BlogPost {
    title: string
    slug: BlogSlug
    featuredImage: BlogFeaturedImage
    publishedAt: string
    modifiedAt: string
}

// Main Site Settings type
export interface SiteSettings {
    topBanner: TopBanner
    header: Header
    footer: Footer
    exitIntentPopup: ExitIntentPopup
    slideoutPopup: SlideoutPopup
}

// API Response type
export interface SiteSettingsResponse {
    siteSettings: SiteSettings
    latestBlogs: BlogPost[]
}


