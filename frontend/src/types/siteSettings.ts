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
    phoneLink?: string
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
    logo: SanityImage,
    aboutSection: {
        heading: string
        about: string
    },
    email: string,
    location: FooterLocation[],
    menu: FooterMenuItem[],
    businessAddressSection: {
        heading: string
        address: string
    },
    businessHoursSection: {
        heading: string
        hours: string
    }
    recentNewsHeading?: string,
    toggleMenu?: boolean,
    locationMenu?: any,
    menuHeading?: string,
    newsletter: FooterNewsletter,
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
    note?: any
}

export interface SlideoutPopup {
    enable: boolean
    heading: string
    description: string
    button: SanityButton
}

export interface SimplePopup {
    heading: string
    description?: string
    msgField?: string
    buttonText: string
    button2Text?: string
    phoneNumber?: string
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
    simplePopup?: SimplePopup
}

// API Response type
export interface SiteSettingsResponse {
    siteSettings: SiteSettings
    latestBlogs: BlogPost[]

}


