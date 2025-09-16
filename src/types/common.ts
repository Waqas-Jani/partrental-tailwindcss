/* eslint-disable @typescript-eslint/no-explicit-any */
// Base types
export interface SanityImage {
    alt?: string
    asset: {
        url: string
    }
}

export interface SanityLink {
    label: string
    link: string
    type: 'internal' | 'external'
}

export interface SanityButton {
    title: string
    linkType: 'internal' | 'external' | 'reservation' | 'id' | 'normal' | 'button' | string
    link: string
    btnType: 'primary' | 'secondary' | string
    cls?: string;
    onClick?: () => void;
    disabled?: boolean;
    product?: any;
    locations?: any;
}