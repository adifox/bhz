import Image from "next/image";
import styles from "./ImageWrapper.module.scss";

const { imageStyles } = styles;

interface MediaProps {
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
  const {
    height,
    width,
    mediaAsset: { alt, filename },
  } = blok;

  return (
    <Image
      src={filename}
      alt={alt}
      height={Number(height)}
      width={Number(width)}
      className={imageStyles}
      priority={priority}
    />
  );
};
