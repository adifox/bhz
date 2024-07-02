import { RichText, Media } from "../ui-components";
import { StoryblokItem } from "../../../types";
import styles from "./ComponentsRenderer.module.scss";

const { sectionStyles } = styles;

const COMPONENTS = {
  richTextComponent: RichText,
  media: Media,
};

export const ComponentsRenderer = ({ blok }: StoryblokItem) => {
  if (
    typeof COMPONENTS[blok?.component as keyof typeof COMPONENTS] !==
    "undefined"
  ) {
    const Component = COMPONENTS[blok.component as keyof typeof COMPONENTS];

    return (
      <section className={sectionStyles}>
        <Component blok={blok} />
      </section>
    );
  }

  return (
    <section className={sectionStyles}>
      <p>Not a known Component</p>
    </section>
  );
};
