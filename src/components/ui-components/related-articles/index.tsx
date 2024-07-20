import { StoryblokItem } from "../../../../types";
import { ArticleCard } from "../article-card";
import styles from "./RelatedArticles.module.scss";

const { mainWrapper, articlesSectionStyles, pageTitleStyles } = styles;

export const RelatedArticles = ({ blok }: StoryblokItem) => {
  console.log("THE DATA:", blok);
  const { title, relatedArticles } = blok;

  const publishedArticles = relatedArticles.map((article: StoryblokItem) => {
    const { content, full_slug: fullSlug } = article;
    console.log("THE ARTICLE DATA:", article);

    const { pageTag } = content;
    const { subHeadline, date, headline, media, author } = content.body[0];

    return (
      <ArticleCard
        key={article.uuid}
        pageTag={pageTag}
        title={headline}
        leadText={subHeadline}
        date={date}
        link={fullSlug}
        image={media}
      />
    );
  });

  return (
    <div className={mainWrapper}>
      <h2 className={pageTitleStyles}>{title}</h2>
      <div className={articlesSectionStyles}>{publishedArticles}</div>
    </div>
  );
};
