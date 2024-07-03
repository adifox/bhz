import Image from "next/image";
import Link from "next/link";
import { StoryblokItem } from "../../../../types";
import styles from "./TopRelated.module.scss";

const {
  headerStyles,
  articleTagStyles,
  miniArticleWrapperStyles,
  tagStyles,
  imageWrapper,
  previewImageStyles,
} = styles;

export const TopRelated = ({ blok }: StoryblokItem) => {
  const { title, topRelated } = blok;

  const articles = topRelated.map((article: StoryblokItem, index: number) => {
    const {
      full_slug: fullSlug,
      name,
      content: { pageTag, previewImage },
    } = article;

    let articleThumbnail = null;
    if (previewImage) {
      const { filename, alt } = previewImage;
      articleThumbnail = (
        <div className={imageWrapper}>
          <Image
            src={filename}
            alt={alt}
            width={220}
            height={100}
            className={previewImageStyles}
          />
        </div>
      );
    }

    return (
      <article key={index} className={articleTagStyles}>
        <span className={tagStyles}>{pageTag}</span>
        <Link href={`/${fullSlug}`}>
          <h4>{name}</h4>
          {articleThumbnail}
        </Link>
      </article>
    );
  });

  return (
    <>
      <h3 className={headerStyles}>{title}</h3>
      <div className={miniArticleWrapperStyles}>{articles}</div>
    </>
  );
};
