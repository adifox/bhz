import StoryblokClient from "storyblok-js-client";
import { handleArticleLinks } from "./helpers";

const STORYBLOK_STORIES = "cdn/stories";
const STORYBLOK_LINKS = "cdn/links/";
const STORYBLOK_SPACES_ME = "cdn/spaces/me";

const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  cache: {
    clear: "auto",
    type: "memory",
  },
});

export const getCacheVersion = async () => {
  return Storyblok.get(STORYBLOK_SPACES_ME, {});
};

export const getStoryblokData = async (url, options = {}) => {
  const cacheVersion = await getCacheVersion();
  const additionalFetchParams = {
    ...options,
    cv: cacheVersion.data.space.version,
    version: process.env.STORYBLOK_VERSION,
    resolve_relations: [
      "topRelated.topRelated",
      "relatedArticles.relatedArticles",
    ],
  };
  const path = [STORYBLOK_STORIES, url].join("/");
  const data = await Storyblok.get(path, additionalFetchParams);

  return data;
};

export const getStoryblokLinks = async (options = {}) => {
  const cacheVersion = await getCacheVersion();
  const additionalFetchParams = {
    ...options,
    cv: cacheVersion.data.space.version,
    version: process.env.STORYBLOK_VERSION,
  };
  const storyblokLinks = await Storyblok.get(
    STORYBLOK_LINKS,
    additionalFetchParams
  );

  const paths = handleArticleLinks(storyblokLinks);

  return {
    paths,
    fallback: true,
  };
};

export const getSelectedArticle = async (id) => {
  const response = await getStoryblokData(id, {
    find_by: "uuid",
  });

  return response;
};

export const renderRichtext = (content) => {
  return {
    __html: Storyblok.richTextResolver.render(content),
  };
};
