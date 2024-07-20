import Image from "next/image";
import styles from "./ImageWrapper.module.scss";

const { imageStyles } = styles;

export interface MediaProps {
  height: string;
  width: string;
  mediaAsset: {
    alt: string;
    filename: string;
  };
}

interface MediaWrapperProps {
  blok: MediaProps;
  priority?: boolean;
}

export const ImageWrapper = ({ blok, priority = false }: MediaWrapperProps) => {
  const { height, width, mediaAsset } = blok;
  console.log("THE BLOK DATA:", mediaAsset);
  return (
    <Image
      src={mediaAsset?.filename || ""}
      alt={mediaAsset?.alt || ""}
      height={Number(height)}
      width={Number(width)}
      className={imageStyles}
      priority={priority}
    />
  );
};
