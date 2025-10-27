/* eslint-disable @typescript-eslint/no-explicit-any */
// components/SanityImage.tsx
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

interface SanityImageProps {
  image: {
    alt?: string;
    crop?: any;
    hotspot?: any;
    asset?: {
      _id?: string;
      url?: string;
      metadata?: {
        dimensions?: {
          width?: number;
          height?: number;
        };
      };
    };
  };
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}

/**
 * Reusable Sanity Image component
 * Automatically applies crop/hotspot and uses dimensions from Sanity metadata.
 */
export default function SanityImage({
  image,
  alt,
  width,
  height,
  className = "",
  sizes = "",
  priority = false,
  fill = false,
}: SanityImageProps) {
  if (!image?.asset?._id) return null;

  const metaWidth = image.asset?.metadata?.dimensions?.width || 800;
  const metaHeight = image.asset?.metadata?.dimensions?.height || 600;

  // Use props width/height or fallback to Sanity metadata
  const w = width || Math.min(metaWidth, 800);
  const h = height || Math.round((w / metaWidth) * metaHeight);

  // Generate optimized URL respecting crop/hotspot
  const imageUrl = urlFor(image)
    .width(w)
    .height(h)
    .fit("crop")
    .auto("format")
    .url();

  return (
    <Image
      src={imageUrl}
      alt={alt || image.alt || "Sanity image"}
      width={fill ? undefined : w}
      height={fill ? undefined : h}
      sizes={sizes}
      priority={priority}
      fill={fill}
      className={`object-cover ${className || ""}`}
    />
  );
}
