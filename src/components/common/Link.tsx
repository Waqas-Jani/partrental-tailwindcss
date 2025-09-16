"use client";

import { slug } from "@/utils";
import Link from "next/link";

interface MyLinkProps {
  text: string;
  linkType: string;
  link: string;
  cls?: string;
  onClick?: () => void;
}

const MyLink = ({
  text,
  linkType,
  link,
  cls,
  onClick = () => {},
}: MyLinkProps) => {
  if (linkType === "internal") {
    return (
      <Link href={slug(link)} onClick={onClick} className={cls}>
        {text}
      </Link>
    );
  } else if (linkType === "external") {
    return (
      <a href={link} target="_blank" onClick={onClick} className={cls}>
        {text}
      </a>
    );
  }

  return null;
};

export default MyLink;
