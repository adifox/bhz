import Gallery from "react-photo-gallery";
import styles from "./PhotoGallery.module.scss";
import { StoryblokItem } from "../../../../types";

const { mainWrapperStyles } = styles;

interface Photo {
  alt: string;
  filename: string;
}

interface PhotoGalleryProps {
  blok: StoryblokItem;
}

export const PhotoGallery = ({ blok }: PhotoGalleryProps) => {
  const { photos, headline } = blok;
  const galleryImages = photos as Photo[];

  const galleryPhotos = galleryImages?.map((photo) => {
    const regex = /\/(\d+)x(\d+)\//;
    const match = photo.filename.match(regex);

    const width = match?.[1];
    const height = match?.[2];

    const imageWidth = width ? Number(width) : 1;
    const imageHeight = height ? Number(height) : 1;

    return {
      src: photo.filename,
      width: imageWidth,
      height: imageHeight,
    };
  });

  return (
    <div className={mainWrapperStyles}>
      <h2>{headline}</h2>
      <Gallery photos={galleryPhotos} />
    </div>
  );
};
