import Gallery from "react-photo-gallery";
import styles from "./PhotoGallery.module.scss";

const { mainWrapperStyles } = styles;

interface Photo {
  alt: string;
  filename: string;
}

interface PhotoGalleryProps {
  headline: string;
  photos: Photo[];
}

export const PhotoGallery = ({ headline, photos }: PhotoGalleryProps) => {
  const galleryPhotos = photos?.map((photo, index) => {
    if (index === 4) {
      return {
        src: photo.filename,
        width: 1440,
        height: 809,
      };
    }
    if (index === 7) {
      return {
        src: photo.filename,
        width: 4,
        height: 3,
      };
    }

    return {
      src: photo.filename,
      width: 1,
      height: 1,
    };
  });

  return (
    <div className={mainWrapperStyles}>
      <h2>{headline}</h2>
      <Gallery photos={galleryPhotos} />
    </div>
  );
};
