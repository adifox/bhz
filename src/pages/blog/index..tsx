import { getStoryblokData } from "../../../utils/storyblok";
import { StoryblokItem } from "../../../types";

export default function Page({ storyblokData }: StoryblokItem) {
  // console.log("THE STORYBLOK DATA ON THE INDEX:", storyblokData);
  return (
    <div>
      <h2>Sobre nosotros</h2>
    </div>
  );
}

export const getStaticProps = async () => {
  const storyblokData = await getStoryblokData("blog");

  return {
    props: { storyblokData },
  };
};
