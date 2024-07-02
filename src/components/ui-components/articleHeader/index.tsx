import { StoryblokItem } from "../../../../types";
import { ImageWrapper } from "../ImageWrapper";
import { Author } from "../author";
import { Date } from "../date";
import styles from "./ArticleHeader.module.scss";

const {
  mainWrapper,
  headlineSectionStyles,
  imageWrapper,
  subHeadlineStyles,
  authorDateStyles,
} = styles;

export const ArticleHeader = ({ blok }: StoryblokItem) => {
  const { author, date, headline, media, subHeadline } = blok;
  const [imageData] = media;

  const authorElement = author.map((authorBlok: StoryblokItem) => (
    <Author key={authorBlok._uid} blok={authorBlok} />
  ));

  const dateElement = <Date dateStr={date} />;

  return (
    <div className={mainWrapper}>
      <div className={headlineSectionStyles}>
        <h1>{headline}</h1>
        <p className={subHeadlineStyles}>{subHeadline}</p>
        <div className={authorDateStyles}>
          {authorElement}
          {dateElement}
        </div>
      </div>
      <div className={imageWrapper}>
        <ImageWrapper blok={imageData} priority />
      </div>
    </div>
  );
};
