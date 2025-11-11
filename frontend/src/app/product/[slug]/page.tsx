/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { getEquipmentBySlug } from "@/lib/equipments";
import ProductGallery from "@/components/product/ProductGallery";
import ProductSpecifications from "@/components/product/ProductSpecifications";
import ProductInfo from "@/components/product/ProductInfo";

export async function generateMetadata({ params }: { params: any }) {
  const { slug } = await params;
  const product = await getEquipmentBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product?.seo?.title || `${product?.name} | Partner Rentals`,
    description:
      product?.seo?.description ||
      product?.shortDescription ||
      `View details and request a quote for ${product?.name}`,
    keywords: product?.seo?.keywords || "",
    openGraph: {
      title: product?.name,
      description: product?.seo?.description || product?.shortDescription,
      images: [
        {
          url: product?.featuredImage?.asset?.url || "",
          width: 1200,
          height: 630,
          alt: product?.featuredImage?.alt || product?.name,
        },
      ],
    },
  };
}

async function ProductPage({ params }: { params: any }) {
  const { slug } = await params;
  const product = await getEquipmentBySlug(slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-5">
      <div className="py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-gray-200 pb-10">
          {/* Product Gallery Section */}
          <div className="lg:col-span-7">
            <ProductGallery
              mainImage={product.featuredImage}
              images={product.galleryImages}
              productName={product.name}
            />
          </div>

          {/* Product Info Section */}
          <div className="lg:col-span-5">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Specifications Section */}
        {product?.additionalInfo?.length > 0 && (
          <div className="py-5 md:py-8">
            <h2 className="text-2xl font-bold text-black mb-4">
              Specifications
            </h2>
            <ProductSpecifications specifications={product?.additionalInfo} />
          </div>
        )}

        {/* Tags Section */}
        {product?.tags?.length > 0 && (
          <div className="mt-5">
            <span className="text-sm font-bold text-gray-800 mb-2 mr-2">
              Tags:
            </span>
            {product?.tags?.map((tag: any, index: number) => (
              <React.Fragment key={tag.slug.current}>
                <a
                  href={`/tag/${tag.slug.current}`}
                  className="text-sm hover:underline text-gray-600 mr-2"
                >
                  {tag.title}
                </a>
                {index < product.tags.length - 1 && ", "}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
