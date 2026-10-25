import type { ImgHTMLAttributes } from "react";
import { site } from "../config/site";
export default function Photo({
  src,
  alt,
  sizes,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const hero = src === site.images.hero;
  const coach = src === site.images.coach;
  return (
    <img
      {...props}
      src={src}
      srcSet={
        hero
          ? site.images.heroSrcSet
          : coach
            ? site.images.coachSrcSet
            : undefined
      }
      sizes={sizes ?? "(max-width: 620px) 85vw, 55vw"}
      alt={
        alt === ""
          ? ""
          : hero
            ? site.images.heroAlt
            : coach
              ? site.images.coachAlt
              : alt
      }
    />
  );
}
