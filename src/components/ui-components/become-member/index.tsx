import Image from "next/image";
import Link from "next/link";
import { ImageProps } from "../../../../types";
import styles from "./BecomeMember.module.scss";

const {
  mainWrapperStyles,
  contentWrapperStyles,
  imageWrapperStyles,
  imageStyles,
  textContentStyles,
  innerTextWrapper,
  ctaButtonWrapper,
  linkStyles,
} = styles;

interface MediaWithTextProps {
  headline: string;
  bodyText: string;
  image: ImageProps;
  ctaButtonText: string;
}

export const BecomeMember = ({
  headline,
  bodyText,
  image,
  ctaButtonText,
}: MediaWithTextProps) => {
  return (
    <div className={mainWrapperStyles}>
      <h2>{headline}</h2>
      <div className={contentWrapperStyles}>
        <div className={imageWrapperStyles}>
          <Image
            className={imageStyles}
            src={image.filename}
            alt={image.alt}
            fill
          />
        </div>
        <div className={textContentStyles}>
          <div className={innerTextWrapper}>
            <p>{bodyText}</p>
            <div className={ctaButtonWrapper}>
              <Link href="/club" className={linkStyles}>
                <span>{ctaButtonText}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
