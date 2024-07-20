import Link from "next/link";
// import Image from "next/image";
import { ImageWrapper, MediaProps } from "../ImageWrapper";
import { Date } from "../date";
import styles from "./ArticleCard.module.scss";

const {
  articleCardWrapperStyles,
  imageWrapperStyles,
  textAreaStyles,
  metaDataWrapperStyles,
  folderNameStyles,
} = styles;

interface ArticleCardProps {
  pageTag: string;
  title: string;
  leadText: string;
  date: string;
  link: string;
  image: MediaProps[];
}

export const ArticleCard = ({
  pageTag,
  title,
  leadText,
  date,
  link,
  image,
}: ArticleCardProps) => {
  const [mediaBlok] = image;

  const dateElement = <Date dateStr={date} />;

  return (
    <div className={articleCardWrapperStyles}>
      <Link href={`/${link}`} target="_self">
        <div className={imageWrapperStyles}>
          <ImageWrapper blok={mediaBlok} />
        </div>
        <div className={textAreaStyles}>
          <div className={metaDataWrapperStyles}>
            <span className={folderNameStyles}>{pageTag}</span>
            <time dateTime={date}>{dateElement}</time>
          </div>
          <h2>{title}</h2>
          {leadText}
        </div>
      </Link>
    </div>
  );
};
