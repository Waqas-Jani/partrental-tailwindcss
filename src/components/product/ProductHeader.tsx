/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../common/SocialIcons";
import styles from "./Hero.module.css";
import ReservationForm from "./ReservationForm";
import Image from "next/image";

const ProductHeader = ({ data, locations }: any) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isReservationFormOpen, setIsReservationFormOpen] = useState(false);

  const product = {
    title: data?.title,
    variants: data?.productVariants,
  };

  // Mock data - replace with actual data from props

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === data.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? data.gallery.length - 1 : prev - 1
    );
  };

  return (
    <div className={styles.hero}>
      {/* Main Product Section */}
      <div className={styles.mainContainer}>
        <div className={styles.productGrid}>
          {/* Product Images */}
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              <Image
                src={data.gallery[currentImageIndex].asset.url}
                alt={data.title}
                className={styles.productImage}
                width={1000}
                height={1000}
              />

              {/* Navigation Arrows */}
              {data.gallery.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className={`${styles.navButton} ${styles.navButtonLeft}`}
                  >
                    <ChevronLeftIcon cls="h-6 w-6 text-gray-500" />
                  </button>
                  <button
                    onClick={nextImage}
                    className={`${styles.navButton} ${styles.navButtonRight}`}
                  >
                    <ChevronRightIcon cls="h-6 w-6 text-gray-500" />
                  </button>
                </>
              )}
            </div>

            {/* Image Indicators */}
            {data.gallery.length > 1 && (
              <div className={styles.indicators}>
                {data.gallery.map((_: any, index: any) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`${styles.indicator} ${
                      index === currentImageIndex
                        ? styles.active
                        : styles.inactive
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className={styles.detailsContainer}>
            {/* Product Title */}
            <h1 className={styles.productTitle}>{data.title}</h1>

            {/* Location and Rental Dates */}
            <div className={styles.rentalSection}>
              {/* Quantity and Reserve Section */}
              <div className={styles.quantityReserveContainer}>
                <div className={styles.additionalInfo}>
                  {/* Specifications */}
                  <div className={styles.infoSection}>
                    <div className={styles.specificationsGrid}>
                      {data.description}
                    </div>
                    {/* Product Variants */}
                    {data.productVariants?.length > 0 && (
                      <div className={styles.productVariants}>
                        <h4 className={styles.productVariantsTitle}>
                          Variants
                        </h4>
                        <ul className={styles.productVariantsList}>
                          {data.productVariants.map((variant: any) => (
                            <li
                              key={variant}
                              className={styles.productVariantsItem}
                            >
                              {variant}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Reserve Button */}
                <button
                  className={styles.reserveButton}
                  onClick={() => setIsReservationFormOpen(true)}
                >
                  RESERVE NOW
                </button>
              </div>
            </div>

            {/* Additional Product Information */}
          </div>
        </div>
      </div>

      {/* Reservation Form Modal */}
      <ReservationForm
        isOpen={isReservationFormOpen}
        onClose={() => setIsReservationFormOpen(false)}
        productTitle={data?.title || "Product"}
        product={product}
        locations={locations}
      />
    </div>
  );
};

export default ProductHeader;
