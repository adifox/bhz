import { GetStaticProps } from "next";
import Head from "next/head";
import { getStoryblokLinks, getStoryblokData } from "../../../utils/storyblok";
import { PageProps, StoryblokItem } from "../../../types";
import { ComponentsRenderer } from "@/components/components-renderer";
import { ArticleHeader, TopRelated } from "@/components/ui-components";
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
  const content = storyblokData?.data?.story?.content;

  let articleHeader = null;
  let topRelated = null;
  const articleContent = content?.body?.map((blok: StoryblokItem) => {
    if (blok.component === "articleHeader") {
      articleHeader = <ArticleHeader key={blok._uid} blok={blok} />;
    } else if (blok.component === "topRelated") {
      topRelated = <TopRelated key={blok._uid} blok={blok} />;
    } else {
      return <ComponentsRenderer key={blok._uid} blok={blok} />;
    }
  });

  return (
    <>
      <Head>
        <title>{storyblokData?.data?.story?.name}</title>
        <meta
          name="description"
          content="Club de fumadores Buenos Humos Zaragoza"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta property="og:title" content={storyblokData?.data?.story?.name} />
        <meta
          property="og:image"
          content={storyblokData?.data?.story?.content?.previewImage?.filename}
        />
        <meta
          property="og:image:alt"
          content={storyblokData?.data?.story?.name}
        />
        <meta
          property="twitter:image"
          content={storyblokData?.data?.story?.content?.previewImage?.filename}
        />
        <meta
          property="twitter:image:alt"
          content={storyblokData?.data?.story?.name}
        />
        <meta
          property="og:description"
          content={storyblokData?.data?.story?.name}
        />
        <meta content="index,follow" name="robots" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={mainWrapper}>
        <div className={articleContentStyles}>
          {articleHeader}
          <div className={articleBodyWrapper}>
            <div className={articleLeftColumn}>{articleContent}</div>
            <div className={articleRightColumn}>{topRelated}</div>
          </div>
        </div>
      </div>
    </>
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
