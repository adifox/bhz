import { getStoryblokData } from "../../../utils/storyblok";
import { StoryblokItem } from "../../../types";
import { ImageWrapper, RelatedArticles } from "@/components/ui-components";
import styles from "./Blog.module.scss";

const { indexMainWrapper, headerImageWrapper, headerImageStyles } = styles;

export default function Page({ storyblokData }: StoryblokItem) {
  const { body } = storyblokData?.data?.story?.content;
  const [headerImage, publishedArticles] = body;

  return (
    <div className={indexMainWrapper}>
      <div className={headerImageWrapper}>
        <ImageWrapper
          blok={headerImage}
          classNames={headerImageStyles}
          priority
        />
      </div>
      <section>
        <RelatedArticles blok={publishedArticles} />
      </section>
    </div>
  );
}

export const getStaticProps = async () => {
  const storyblokData = await getStoryblokData("blog");

  return {
    props: { storyblokData },
  };
};
