/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { _renderSection } from "@/components/RenderSection";
import PageBanner from "@/components/common/PageBanner";
import {
  getLocationBySlug,
  getAllLocation,
  getBlogBySlug,
  getBlogFullBySlug,
  getBlogCategoryList,
  getBlogTagList,
  getRecentBlogs,
} from "@/lib";
import { getAllLandingPages, getLandingPageBySlug } from "@/lib/getLandingPage";
import { sanityClient } from "@/lib/sanity";
import BlogContent from "@/components/blog";
import { CircleArrowRightIcon } from "@/components/common/SocialIcons";

interface MetadataProps {
  params: Promise<{ location: string[] }>;
}
interface ServicesPageProps {
  params: Promise<{ location: string[] }>;
}

export async function generateMetadata({ params }: MetadataProps) {
  const locationParams = await params;
  const slug = locationParams.location.join("/");

  try {
    const [landingList, locationList] = await Promise.all([
      getAllLandingPages(),
      getAllLocation(),
    ]);

    // Check for landing page
    const isLandingPage = landingList.some(
      (landing: any) => landing.slug === locationParams.location[0]
    );

    if (isLandingPage) {
      const data = await getLandingPageBySlug(slug);

      return {
        title: data.seo?.title || data.title,
        description: data.seo?.description,
        keywords: data.seo?.keywords,
        openGraph: {
          title: data.seo?.title || data.title,
          description: data.seo?.description,
          images: [
            {
              url: data.landingHero?.bg?.asset?.url,
              width: 1200,
              height: 630,
            },
          ],
        },
        alternates: {
          canonical: `https://partnerrentals.com/${slug}`,
        },
      };
    }

    // Check for location page
    const isLocationPage = locationList.some(
      (location: any) => location.slug === locationParams.location[0]
    );

    if (isLocationPage) {
      const data = await getLocationBySlug(
        locationParams.location[0],
        locationParams.location.length > 1 ? locationParams.location[1] : null
      );

      return {
        title: data.sanityLocation?.seo?.title || data.sanityLocation?.title,
        description: data.sanityLocation?.seo?.description,
        keywords: data.sanityLocation?.seo?.keywords,
        openGraph: {
          title: data.sanityLocation?.seo?.title || data.sanityLocation?.title,
          description: data.sanityLocation?.seo?.description,
          images: [
            {
              url: data.sanityLocation?.hero?.bg?.asset?.url,
              width: 1200,
              height: 630,
            },
          ],
        },
        alternates: {
          canonical: `https://partnerrentals.com/${slug}`,
        },
      };
    }

    // Check for blog post
    const blog = await getBlogBySlug(locationParams.location[0]);
    console.log("===blog===", blog);
    if (!blog) {
      return { title: "Page not found" };
    }

    return {
      title: blog.title,
      description: blog.seo?.description || "",
      keywords: blog.seo?.keywords || "",
      openGraph: {
        title: blog.title,
        description: blog.seo?.description || "",
        images: [
          {
            url: blog.featuredImage?.asset?.url,
            width: 1200,
            height: 630,
          },
        ],
      },
      alternates: {
        canonical: `https://partnerrentals.com/${locationParams.location[0]}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return { title: "Error" };
  }
}

const ServicesPage = async ({ params }: ServicesPageProps) => {
  const locationParams = await params;

  try {
    const [landingList, locationList] = await Promise.all([
      getAllLandingPages(),
      getAllLocation(),
    ]);

    // Check for landing page
    const isLandingPage = landingList.some(
      (landing: any) => landing.slug === locationParams.location[0]
    );

    if (isLandingPage) {
      // TODO: Implement LandingPage component
      return <div>Landing Page - Coming Soon</div>;
    }

    // Check for location page
    const isLocationPage = locationList.some(
      (location: any) => location.slug === locationParams.location[0]
    );

    if (isLocationPage) {
      const data = await getLocationBySlug(
        locationParams.location[0],
        locationParams.location.length > 1 ? locationParams.location[1] : null
      );

      return (
        <div>
          <PageBanner
            pageName={data?.sanityLocation?.hero?.heading}
            data={data?.sanityLocation?.hero}
          />
          {data?.sanityLocation?.pageBuilder?.map((item: any, index: number) =>
            _renderSection(item, index)
          )}

          {/* Service Area Section - Only shown on location pages */}
          {data?.sanityLocation?.locationServices &&
            data.sanityLocation.locationServices.length > 0 && (
              <section className="py-5 md:py-16">
                <div className="container mx-auto px-5">
                  <div className="text-center mb-12">
                    <h2 className="h1-type">Services Area</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data?.sanityLocation?.locationServices?.map(
                      (service: any, index: number) => (
                        <div
                          key={index}
                          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
                        >
                          <h4 className="text-xl md:text-2xl font-bold text-secondary mb-4">
                            {service.title}
                          </h4>
                          <div className="flex">
                            <Link
                              href={`/${data.sanityLocation.slug?.current}/${service.slug?.current}`}
                              className="main-btn primary-btn"
                            >
                              View Details
                              <CircleArrowRightIcon />
                            </Link>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </section>
            )}
        </div>
      );
    }

    // Handle blog post - fetch all data in parallel
    const [blog, categories, tags, recentBlogs, contact] = await Promise.all([
      getBlogFullBySlug(locationParams.location[0]),
      getBlogCategoryList(),
      getBlogTagList(),
      getRecentBlogs(),
      sanityClient.fetch(`*[_type == "blogPage"][0].contact`),
    ]);

    if (!blog) {
      notFound();
    }

    return (
      <BlogContent data={{ blog, categories, tags, recentBlogs, contact }} />
    );
  } catch (error) {
    console.error("Error loading page:", error);
    notFound();
  }
};

export default ServicesPage;
