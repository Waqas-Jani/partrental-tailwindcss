/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export default function BlogHero({ blog }: { blog: any }) {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-24"
      style={{
        backgroundImage: `url(${blog?.featuredImage?.asset?.url})`,
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {blog?.title}
          </h1>
        </div>
      </div>
    </section>
  );
}
