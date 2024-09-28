import { ImageWrapper } from "../ImageWrapper";
import { StoryblokItem } from "../../../../types";

export const Media = ({ blok }: StoryblokItem) => {
  // To be expanded with Video renderer
  return (
    <div style={{ marginTop: "24px", marginBottom: "24px" }}>
      <ImageWrapper blok={blok} />
    </div>
  );
};
