import { type SchemaTypeDefinition } from 'sanity'
// Documents
import category from './documents/category'
import tag from './documents/tag'
import team from './documents/team'
import client from './documents/client'
import blog from './documents/blog'
import partner from './documents/partner'
import author from './documents/author'
import product from './documents/product'
import productCategory from './documents/productCategory'
import productTag from './documents/productTag'
import rentCategory from './documents/rent-category'
import rentSubcategory from './documents/rent-subcategory'
import location from './documents/location'
import locationService from './documents/location-service'
import resource from './documents/file'
import landingPage from './documents/landing-page'

// Pages
import settings from './pages/settings'
import homePage from './pages/home'
import rentPage from './pages/rent'
import faqPage from './pages/faq'
import aboutPage from './pages/about'
import usedPage from './pages/used'
import newPage from './pages/new'
import servicesPage from './pages/services'
import contactPage from './pages/contact'
import blogPage from './pages/blog'
import downloadPage from './pages/downloads'
import accountAccess from './pages/account-access'

// Objects
import header from './objects/settings/header'
import headerMenu from './objects/settings/header/headerMenu'
import footer from './objects/settings/footer'
import footerLink from './objects/settings/footer/footerLink'
import topBanner from './objects/settings/topBanner'
import social from './objects/components/social'
import link from './objects/settings/link'
import commonLink from './objects/components/link'
import figure from './objects/components/figure'
import simpleBlock from './objects/components/simpleBlock'
import seo from './objects/components/seo'
import editor from './objects/components/editor'
import editor2 from './objects/components/editor2'
import button from './objects/components/button'
import hero from './objects/hero'
import contactForm from './objects/contactForm'
import contactObj from './objects/contactObj'
import productSec from './objects/productSec'
import heroHome from './objects/home/homeHero'
import choose from './objects/choose'
import downloadSec from './objects/download/downloadSec'
import downloadCtaSec from './objects/download/downloadCtaSec'
import clientSec from './objects/clientSec'
import faqSec from './objects/faq'
import faqItem from './objects/faq/item'
import partnerSec from './objects/partner'
import contactSec from './objects/contactPage/contact'
import contactItem from './objects/contactPage/item'
import teamSec from './objects/teamSec'
import offer from './objects/home/offer'
import contactHome from './objects/home/contact'
import homeForm from './objects/home/contact/form'
import contactInfoSec from './objects/home/contact/info'
import contactInfoItem from './objects/home/contact/infoItem'
import promotionalBanner from './objects/home/promotion'
import offerItem from './objects/home/promotion/offer'
import newsletter from './objects/settings/footer/newsletter'
import statistics from './objects/statistics'
import statisItem from './objects/statistics/item'
import aboutSec from './objects/about'
import aboutItem from './objects/about/item'
import aboutHome from './objects/aboutHome'
import aboutHomeItem from './objects/aboutHome/item'
import banner from './objects/banner'
import portfolioSec from './objects/portfolioSec'
import portfolioSecTwo from './objects/portfolioSecTwo'
import blogSec from './objects/blogSec'

import serviceSecOne from './objects/services/serviceSecOne'
import serviceSecTwo from './objects/services/serviceSecTwo'
import serviceSecThree from './objects/services/serviceSecThree'
import serviceItemOne from './objects/services/items/itemOne'
import serviceItemTwo from './objects/services/items/itemTwo'
import clientSecTwo from './objects/clientSecTwo'
import file from './objects/file'
import contactBanner from './objects/contactBanner'
import pointItem from './objects/home/pointItem'
import imageContent from './objects/components/imageContent'
import contentSection from './objects/components/content'
import splitContent from './objects/components/split-content'
import stepsSec from './objects/components/stepsSec'
import stepItem from './objects/components/stepItem'
import listingSec from './objects/components/listing'
import attribute from './objects/attritbute'

// Landing Page
import landingHero from './objects/landingpage/hero'
import landingFeature from './objects/landingpage/features'
import landingfeatureItem from './objects/landingpage/featureItem'
import landingTestimonial from './objects/landingpage/testimonial'
import landingTestimonialItem from './objects/landingpage/testimonialItem'
import landingForm from './objects/landingpage/form'
import exitIntentPopup from './objects/exitIntentPopup'
import button2 from './objects/components/button2'
import serviceSec from './objects/landingpage/serviceSec'
import serviceItem from './objects/landingpage/serviceItem'
import slideoutPopup from './objects/slideoutPopup'

// Documents
const documents: SchemaTypeDefinition[] = [
    author,
    blog,
    category,
    client,
    partner,
    product,
    productCategory,
    productTag,
    rentCategory,
    rentSubcategory,
    location,
    locationService,
    tag,
    team,
    resource,
    landingPage,
]

// Pages
const pages: SchemaTypeDefinition[] = [
    settings,
    homePage,
    rentPage,
    faqPage,
    aboutPage,
    usedPage,
    newPage,
    servicesPage,
    contactPage,
    blogPage,
    downloadPage,
    accountAccess,
]

// Objects
const objects: SchemaTypeDefinition[] = [
    header,
    headerMenu,
    footer,
    footerLink,
    topBanner,
    social,
    link,
    commonLink,
    figure,
    simpleBlock,
    seo,
    editor,
    editor2,
    button,
    hero,
    contactForm,
    contactObj,
    productSec,
    heroHome,

    choose,
    downloadSec,
    downloadCtaSec,
    clientSec,
    faqSec,
    faqItem,
    partnerSec,
    contactSec,
    contactItem,
    teamSec,
    offer,
    contactHome,
    homeForm,
    contactInfoSec,
    contactInfoItem,
    promotionalBanner,
    offerItem,
    newsletter,
    statistics,
    statisItem,
    aboutSec,
    aboutItem,
    aboutHome,
    aboutHomeItem,
    banner,
    portfolioSec,
    portfolioSecTwo,
    blogSec,
    serviceSecOne,
    serviceSecTwo,
    serviceSecThree,
    serviceItemOne,
    serviceItemTwo,
    clientSecTwo,
    file,
    contactBanner,
    pointItem,
    imageContent,
    contentSection,
    splitContent,
    stepsSec,
    stepItem,
    listingSec,
    attribute,
    landingHero,
    landingFeature,
    landingfeatureItem,
    landingTestimonial,
    landingTestimonialItem,
    landingForm,
    exitIntentPopup,
    button2,
    serviceSec,
    serviceItem,
    slideoutPopup,
]


export const schemaTypes = [...documents, ...pages, ...objects]