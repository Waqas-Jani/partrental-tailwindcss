import React from "react";
import PageBanner from "@/components/common/PageBanner";
import ProductCategories from "@/components/product/ProductCategories";
import ProductGrid from "@/components/product/ProductGrid";
import { getEquipments, getEquipmentCategory } from "@/lib/equipments";
import { getUsedProductsPageData } from "@/lib/product";
import { SearchParams } from "@/types/common";

export async function generateMetadata() {
  const { sanityUsedProductsPage } = await getUsedProductsPageData();
  return {
    title: sanityUsedProductsPage?.seo.title,
    description: sanityUsedProductsPage?.seo.description,
    openGraph: {
      title: sanityUsedProductsPage?.seo.title,
      description: sanityUsedProductsPage?.seo.description,
      images: [
        {
          url: sanityUsedProductsPage?.hero?.bg?.asset?.url || "",
          width: 1200,
          height: 630,
          alt: sanityUsedProductsPage?.hero?.heading,
        },
      ],
    },
    alternates: {
      canonical: `https://partnerrentals.com/product-category/used`,
    },
  };
}

export default async function UsedProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // Extract filter parameters from URL
  const params = await searchParams;
  const { sanityUsedProductsPage } = await getUsedProductsPageData();
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
    isUsed: true,
  });

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / limit);

  // Fetch all categories for the sidebar
  const categories = await getEquipmentCategory();

  return (
    <>
      <PageBanner
        pageName={sanityUsedProductsPage?.hero?.heading}
        data={sanityUsedProductsPage?.hero}
      />
      <section className="pt-10 md:pt-16 pb-40 container mx-auto px-5">
        <div className="grid grid-cols-12 gap-5">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <ProductCategories categories={categories} page="used" />
          </div>

          {/* Products Grid */}
          <div className="col-span-12 lg:col-span-9">
            <ProductGrid
              products={products}
              currentPage={page}
              totalPages={totalPages}
              totalCount={totalCount}
              sort={sort}
              baseUrl="/product-category/used"
            />
          </div>
        </div>
      </section>
    </>
  );
}
