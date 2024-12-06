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
  classNames?: string;
}

export const ImageWrapper = ({
  blok,
  priority = false,
  classNames,
}: MediaWrapperProps) => {
  const { height, width, mediaAsset } = blok;

  return (
    <Image
      src={mediaAsset?.filename || ""}
      alt={mediaAsset?.alt || ""}
      height={Number(height)}
      width={Number(width)}
      className={`${imageStyles} ${classNames}`}
      priority={priority}
    />
  );
};
