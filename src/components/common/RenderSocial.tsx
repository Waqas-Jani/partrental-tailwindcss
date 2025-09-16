import React from "react";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
  LinkedinIcon,
} from "./SocialIcons";

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

    case "fa-twitter":
      return <TwitterIcon />;

    default:
      return null;
  }
}
