import { ISbStory, ISbComponentType } from "storyblok-js-client";

export interface PageProps {
  storyblokData: ISbStory;
  articleList?: ISbStory[];
  path?: string;
}

export type StoryblokItem = ISbComponentType<string> & { [index: string]: any };
