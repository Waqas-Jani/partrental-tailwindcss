import React from "react";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  LinkedinIcon,
  XIcon,
} from "./Icons";

export default function RenderSocial({ icon }: { icon: string }) {
  switch (icon) {
    case "fa-facebook-f":
      return <FacebookIcon />;

    case "fa-youtube":
      return <YoutubeIcon />;

    case "fa-linkedin":
      return <LinkedinIcon />;

    case "fa-instagram":
      return <InstagramIcon />;

    case "fa-x":
      return <XIcon />;

    default:
      return null;
  }
}
