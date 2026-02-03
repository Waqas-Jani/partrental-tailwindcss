/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamic from "next/dynamic";
import HomeSlider from "@/components/slider/HomeSlider";
import { getHomePage } from "@/lib";

const HomeAbout = dynamic(() => import("@/sections/About"));
const Services = dynamic(() => import("@/sections/Services"));
const PromotionalBanner = dynamic(() => import("@/sections/PromotionalBanner"));
const ContactBanner = dynamic(() => import("@/sections/ContactBanner"));
const WhyChooseUs = dynamic(() => import("@/sections/WhyChoooseUs"));
const Contact = dynamic(() => import("@/sections/Contact"));
const Testimonials = dynamic(() => import("@/sections/Testimonials"));
const Blogs = dynamic(() => import("@/sections/Blogs"));
const Partners = dynamic(() => import("@/sections/Partners"));
const TeamSection = dynamic(() => import("@/sections/TeamSection"));

export async function generateMetadata() {
    const data = await getHomePage();
    const homePage = data.sanityHomePage || {};

    return {
        title: homePage?.seo?.title,
        description: homePage?.seo?.description,
        keywords: homePage?.seo?.keywords,

        alternates: {
            canonical: "https://partnerrentals.com",
        },
    };
}
export default async function Home() {
    const data = await getHomePage();
    const homePage = data?.sanityHomePage || {};
    const hero = homePage?.homeHero || {};
    const pageBuilder = homePage?.pageBuilder || [];
    //   const statistic = data.sanitySitesettings?.statistic;

    let partnerSec,
        clientSec,
        aboutHome,
        offers,
        homeContact,
        blogSec,
        serviceSecOne,
        teamSec,
        promotionalBanner;

    function _renderSection(element: any, idx: number) {
        switch (element?._type) {
            case "partnerSec":
                return element.enable && <Partners data={element} key={idx} />
            case "clientSec":
                return element.enable && <Testimonials data={element} key={idx} />;
            case "aboutHome":
                return element.enable && <HomeAbout data={element} key={idx} />;
            case "serviceSecOne":
                return element.enable && <Services data={element} key={idx} />;
            case "promotionalBanner":
                return element.enable && <PromotionalBanner data={element} key={idx} />;
            case "offers":
                return element.enable && <WhyChooseUs data={element} key={idx} />;
            case "teamSec":
                return element.enable && <TeamSection data={element} key={idx} />;
            case "homeContact":
                return element.enable && <Contact data={element} key={idx} />;
            case "blogSec":
                return element.enable && <Blogs data={element} key={idx} />;
            case "contactBanner":
                return element.enable && <ContactBanner data={element} key={idx} />;
            default: return null;
        }
    }

    return (
        <>
            <HomeSlider data={hero} />
            {pageBuilder?.map((element: any, idx: number) =>
                _renderSection(element, idx)
            )}
        </>
    );
}
