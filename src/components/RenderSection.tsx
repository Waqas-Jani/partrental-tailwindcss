/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ReactNode } from "react";
import Blogs from "../sections/Blogs";
import HomeContact from "../sections/Contact";
import PartnerSec from "../sections/Partners";
import Testimonials from "../sections/Testimonials";
import ImageContent from "@/components/common/imageContent";
import ContentSection from "@/sections/ContentSection";
import ListingSection from "@/sections/ListingSection";

export const _renderSection = (
  item: any,
  key: number,
  noPadding = false,
  locations = []
): ReactNode => {
  if (!item.enable) return null;

  switch (item._type) {
    case "blogs":
      return item.enable && <Blogs key={key} data={item} />;

    case "homeContact":
      return (
        item.enable && <HomeContact key={key} data={item} isHome={false} />
      );

    case "partners":
      return item.enable && <PartnerSec key={key} data={item} />;

    case "testimonials":
      return item.enable && <Testimonials key={key} data={item} />;

    case "imageContent":
      return (
        item.enable && (
          <ImageContent
            key={key}
            index={key}
            data={item}
            noPadding={noPadding}
            locations={locations}
          />
        )
      );

    case "contentSection":
      return (
        item.enable && (
          <ContentSection
            key={key}
            index={key}
            data={item}
            noPadding={noPadding}
            locations={locations}
          />
        )
      );

    case "listingSec":
      return (
        item.enable && (
          <ListingSection key={key} data={item} noPadding={noPadding} />
        )
      );

    default:
      return null;
  }
};
