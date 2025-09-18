"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Link from "next/link";
import ReservationForm from "../product/ReservationForm";
import { SanityButton } from "@/types/common";
import { CircleArrowRightIcon } from "./SocialIcons";

const Button = ({
  title,
  link,
  cls = "",
  borderCls = "",
  btnType = "primary",
  linkType = "normal",
  onClick,
  disabled,
  product,
  locations,
}: SanityButton) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user is on mobile device
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (linkType === "normal") {
    return (
      <button
        type="submit"
        className={`main-btn ${cls} ${
          btnType === "primary" ? "primary-btn" : `secondary-btn ${borderCls}`
        }`}
        disabled={disabled}
      >
        {title}
        <CircleArrowRightIcon />
      </button>
    );
  } else if (linkType === "button") {
    return (
      <button
        type="button"
        className={`main-btn ${cls} ${
          btnType === "primary" ? "primary-btn" : `secondary-btn ${borderCls}`
        }`}
        onClick={onClick}
        disabled={disabled}
      >
        {title}
        <CircleArrowRightIcon />
      </button>
    );
  } else if (linkType === "internal") {
    return (
      <Link
        href={link ?? ""}
        className={`main-btn ${cls} ${
          btnType === "primary" ? "primary-btn" : `secondary-btn ${borderCls}`
        }`}
      >
        {title}
        <CircleArrowRightIcon />
      </Link>
    );
  } else if (linkType === "external") {
    const isPhoneNumber = link?.startsWith("tel:");

    if (isPhoneNumber && isMobile) {
      // On mobile, use direct phone call without protocol
      const phoneNumber = link.replace("tel:", "");
      return (
        <a
          href={`tel:${phoneNumber}`}
          className={`main-btn ${cls} ${
            btnType === "primary" ? "primary-btn" : `secondary-btn ${borderCls}`
          }`}
        >
          {title}
          <CircleArrowRightIcon />
        </a>
      );
    }

    return (
      <a
        href={link}
        className={`main-btn ${cls} ${
          btnType === "primary" ? "primary-btn" : `secondary-btn ${borderCls}`
        } `}
        target={isPhoneNumber ? "_self" : "_blank"}
        rel="noopener noreferrer"
      >
        {title}
        <CircleArrowRightIcon />
      </a>
    );
  } else if (linkType === "id") {
    return (
      <a
        href={`#${link}`}
        className={`main-btn ${cls} ${
          btnType === "primary" ? "primary-btn" : `secondary-btn ${borderCls}`
        }`}
      >
        {title}
        <CircleArrowRightIcon />
      </a>
    );
  } else if (linkType === "reservation") {
    return (
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className={`main-btn ${cls} ${
            btnType === "primary" ? "primary-btn" : `secondary-btn ${borderCls}`
          } `}
        >
          {title}
          <CircleArrowRightIcon />
        </button>
        <ReservationForm
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          productTitle={product?.title}
          product={product}
          locations={locations}
        />
      </div>
    );
  }
};

export default Button;
