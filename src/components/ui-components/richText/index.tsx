import { StoryblokItem } from "../../../../types";
import { renderRichtext } from "../../../../utils/storyblok";
import styles from "./RichText.module.scss";

const { richtextStyling } = styles;

export const RichText = ({ blok }: StoryblokItem) => {
  const { text } = blok;
  return (
    <div
      className={richtextStyling}
      dangerouslySetInnerHTML={renderRichtext(text)}
    />
  );
};
