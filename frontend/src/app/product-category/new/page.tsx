import React from "react";
import PageBanner from "@/components/common/PageBanner";
import { getNewProductsPageData } from "@/lib/product";
import { getEquipments, getEquipmentCategory } from "@/lib/equipments";
import ProductCategories from "@/components/product/ProductCategories";
import ProductGrid from "@/components/product/ProductGrid";
import { SearchParams } from "@/types/common";


export async function generateMetadata() {
  const { sanityNewProductsPage } = await getNewProductsPageData();
  return {
    title: sanityNewProductsPage.seo.title,
    description: sanityNewProductsPage.seo.description,
    openGraph: {
      title: sanityNewProductsPage.seo.title,
      description: sanityNewProductsPage.seo.description,
      images: [
        {
          url: sanityNewProductsPage.hero.bg.asset.url || "",
          width: 1200,
          height: 630,
          alt: sanityNewProductsPage.hero.heading,
        },
      ],
    },
    alternates: {
      canonical: `https://partnerrentals.com/product-category/new`,
    },
  };
}

export default async function NewProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  // Extract filter parameters from URL
  const { sanityNewProductsPage } = await getNewProductsPageData();
  const page = parseInt(params.page) || 1;
  const sort = params.sort || "default";
  const search = params.search || "";
  const category = params.category || "";

  // Items per page
  const limit = 20;

  // Fetch products with server-side filtering
  const { products, totalCount } = await getEquipments({
    page,
    limit,
    sort,
    search,
    category,
    isUsed: false,
  });

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / limit);

  // Fetch all categories for the sidebar
  const categories = await getEquipmentCategory();

  return (
    <>
      <PageBanner
        pageName={sanityNewProductsPage.hero.heading}
        data={sanityNewProductsPage.hero}
      />

      <section className="pt-10 md:pt-16 pb-40 container mx-auto px-5">
        <div className="grid grid-cols-12 gap-5">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <ProductCategories categories={categories} page="new" />
          </div>

          {/* Products Grid */}
          <div className="col-span-12 lg:col-span-9">
            <ProductGrid
              products={products}
              currentPage={page}
              totalPages={totalPages}
              totalCount={totalCount}
              sort={sort}
              baseUrl="/product-category/new"
            />
          </div>
        </div>
      </section>
    </>
  );
}
