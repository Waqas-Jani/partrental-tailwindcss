"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/common/Button";

interface ContactBannerProps {
    data: {
        enable?: boolean;
        heading?: string;
        subheading?: string;
        description?: string;
        button?: {
            title?: string;
            linkType?: string;
            link?: string;
            btnType?: string;
        };
        bgImage?: {
            asset?: { url?: string };
        };
    };
}

const ContactBanner: React.FC<ContactBannerProps> = ({ data }) => {
    const { heading, subheading, description, button, bgImage } = data;
    const bgUrl = bgImage?.asset?.url;

    if (!heading && !subheading && !description) return null;

    return (
        <section className="relative py-16 md:py-24 min-h-[320px] flex items-center overflow-hidden">
            {bgUrl && (
                <>
                    <div className="absolute inset-0">
                        <Image
                            src={bgUrl}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="100vw"
                            priority={false}
                        />
                    </div>
                    <div className="absolute inset-0 bg-black/60 z-[1]" />
                </>
            )}
            {!bgUrl && (
                <div className="absolute inset-0 bg-gray-900 z-[1]" />
            )}

            <div className="relative z-10 tp-container text-center text-white">
                {subheading && (
                    <p className="text-sm tracking-widest uppercase font-semibold text-white/90 mb-2">
                        {subheading}
                    </p>
                )}
                {heading && (
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                        {heading}
                    </h2>
                )}
                {description && (
                    <p className="max-w-2xl mx-auto text-gray-200 text-sm md:text-base leading-relaxed mb-8">
                        {description}
                    </p>
                )}
                <div className="flex justify-center">

                    {button?.title && (
                        <Button
                            title={button.title}
                            btnType={button.btnType || "primary"}
                            link={button.link || ""}
                            linkType={button.linkType || "internal"}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactBanner;
