import { GetStaticProps } from "next";
import Head from "next/head";
import {
  getStoryblokLinks,
  getStoryblokData,
  renderRichtext,
} from "../../../utils/storyblok";
import { PageProps, StoryblokItem } from "../../../types";
import { ComponentsRenderer } from "@/components/components-renderer";
import { ArticleHeader } from "@/components/ui-components";
import styles from "./Blog.module.scss";

const {
  mainWrapper,
  articleContentStyles,
  articleBodyWrapper,
  articleLeftColumn,
  articleRightColumn,
} = styles;

const PAGE_PATH = "blog";

export default function Article({ storyblokData, path }: PageProps) {
  const { content } = storyblokData?.data?.story;

  let articleHeader = null;
  const articleContent = content?.body?.map((blok: StoryblokItem) => {
    console.log("THE STORY COMPONENT", blok);
    if (blok.component === "articleHeader") {
      articleHeader = <ArticleHeader key={blok._uid} blok={blok} />;
    } else {
      return <ComponentsRenderer key={blok._uid} blok={blok} />;
    }
  });

  return (
    <div className={mainWrapper}>
      <div className={articleContentStyles}>
        {articleHeader}
        <div className={articleBodyWrapper}>
          <div className={articleLeftColumn}>{articleContent}</div>
          <div className={articleRightColumn}>
            <div>
              <p>This is some text and should be sticking around</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths = async () =>
  await getStoryblokLinks({ starts_with: PAGE_PATH });

export const getStaticProps: GetStaticProps = async (context) => {
  const article = context?.params?.article;
  const path = [PAGE_PATH, article].join("/");
  const storyblokData = await getStoryblokData(path);

  return {
    props: { storyblokData, path },
  };
};
