import Image from "next/image";
import { StoryblokItem } from "../../../../types";
import styles from "./Author.module.scss";

const { mainWrapper, imageWrapper, authorNameStyles } = styles;

export const Author = ({ blok }: StoryblokItem) => {
  const {
    authorName,
    profileImage: { filename, alt },
  } = blok;

  return (
    <div className={mainWrapper}>
      <div className={imageWrapper}>
        <Image src={filename} alt={alt} width={50} height={50} />
      </div>
      <span className={authorNameStyles}>
        <p>{authorName}</p>
      </span>
    </div>
  );
};
