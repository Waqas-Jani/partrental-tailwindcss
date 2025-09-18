/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import { slug } from "@/utils";

export const PortableTextComponent: any = {
  marks: {
    color: ({ value, children }: { value: any; children: any }) => (
      <span style={{ color: value.hex }}>{children}</span>
    ),
    link: ({ value, children }: { value: any; children: any }) => {
      const href = value?.href || "";
      const isExternal = href.startsWith("http");
      const isTel = href.startsWith("tel:");
      const isMailto = href.startsWith("mailto:");
      const target = isExternal ? "_blank" : undefined;

      if (isTel || isMailto) {
        return (
          <a
            href={href}
            className="underline transition-colors duration-150 ease-linear underline-offset-8 hover:text-primary"
          >
            {children}
          </a>
        );
      } else if (!isExternal) {
        return (
          <Link
            href={slug(href)}
            className="underline transition-colors duration-150 ease-linear underline-offset-8 hover:text-primary"
          >
            {children}
          </Link>
        );
      } else {
        return (
          <a
            href={href}
            target={target}
            rel={target === "_blank" ? "noindex nofollow" : undefined}
            className="underline transition-colors duration-150 ease-linear underline-offset-8 hover:text-primary"
          >
            {children}
          </a>
        );
      }
    },
  },
  block: {
    h1: ({ children }: { children: any }) => (
      <h1 className="text-4xl md:text-5xl mb-5 leading-[1.3] md:leading-[1.3]">
        {children}
      </h1>
    ),
    h2: ({ children }: { children: any }) => (
      <h2 className="text-3xl md:text-4xl mb-[20px] leading-[1.2] md:leading-[1.3]">
        {children}
      </h2>
    ),
    h3: ({ children }: { children: any }) => (
      <h3 className="text-2xl md:text-3xl mb-[10px] leading-[1.2] md:leading-[1.3]">
        {children}
      </h3>
    ),
  },
  list: {
    unordered: ({ children }: { children: any }) => (
      <ul className="pt-[15px] pb-[15px]">{children}</ul>
    ),
    ordered: ({ children }: { children: any }) => (
      <ol className="pt-[15px] pb-[15px]">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children: any }) => (
      <li className="list-item">
        <span>{children}</span>
      </li>
    ),
    number: ({ children }: { children: any }) => (
      <li className="list-item">
        <span>{children}</span>
      </li>
    ),
  },
};
