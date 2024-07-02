import { ImageWrapper } from "../ImageWrapper";
import { StoryblokItem } from "../../../../types";

export const Media = ({ blok }: StoryblokItem) => {
  // To be expanded with Video renderer
  return <ImageWrapper blok={blok} />;
};
