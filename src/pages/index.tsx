import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { PhotoGallery } from "@/components/ui-components/photo-gallery";
import { BecomeMember } from "@/components/ui-components/become-member";
import { AgeVerificationModal } from "@/components/ui-components/age-verification-modal";
import { StoryblokItem, PageProps } from "../../types";
import { getStoryblokData } from "../../utils/storyblok";
import styles from "@/styles/Home.module.scss";

const {
  mainContainerStyles,
  heroContainerStyles,
  heroTextContainerStyles,
  imageStyles,
  underHeroBannerStyles,
  sectionWrapperStyles,
  sectionInnerWrapperStyles,
  sectionTextWrapperStyles,
  sectionImageWrapperStyles,
} = styles;

export default function Home({ storyblokData }: PageProps) {
  const [isAgeVerified, setIsAgeVerified] = useState<boolean>(false);

  const {
    story: { content },
  } = storyblokData.data;

  const storyblokContent = content?.body?.map((story: StoryblokItem) => {
    if (story.component === "imageGallery") {
      return (
        <section key={story._uid} className={sectionWrapperStyles}>
          <PhotoGallery blok={story} />
        </section>
      );
    }

    if (story.component === "mediaWithText") {
      return (
        <section key={story._uid} className={sectionWrapperStyles}>
          <BecomeMember
            headline={story.headline}
            bodyText={story.bodyText}
            image={story.image}
            ctaButtonText={story.ctaButtonText}
          />
        </section>
      );
    }
  });

  const handleAgeVerification = () => {
    setIsAgeVerified(true);
  };

  return (
    <>
      <AgeVerificationModal onAgeVerified={handleAgeVerification} />
      <Head>
        <title>Buenos Humos Zaragoza</title>
        <meta
          name="description"
          content="Club de fumadores Buenos Humos Zaragoza"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta
          property="og:title"
          content="Buenos Humos Zaragoza es un club de fumadores de tabacos premium"
        />
        <meta property="og:image" content="/Images/bhz-web-logo.png" />
        <meta property="og:image:alt" content="Buenos Humos Zaragoza" />
        <meta property="twitter:image" content="Images/bhz-web-logo.png" />
        <meta property="twitter:image:alt" content="Buenos Humos Zaragoza" />
        <meta
          property="og:description"
          content="Club de fumadores Buenos Humos Zaragoza"
        />
        <meta content="index,follow" name="robots" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isAgeVerified && (
        <main className={mainContainerStyles}>
          <div className={heroContainerStyles}>
            <Image
              className={imageStyles}
              src="/Images/whiskey-and-cigars.jpg"
              alt="Buenos Humos Zaragoza Logo"
              fill
              priority
            />
            <div className={heroTextContainerStyles}>
              <h2>Bienvenid@ al club de fumadores Buenos Humos Zaragoza</h2>
            </div>
          </div>
          <div className={underHeroBannerStyles}>
            <p>
              No te pierdas el próximo evento de Buenos Humos Zaragoza.
              Descúbrenos en Instagram para más detalles.
            </p>
          </div>
          <section className={sectionWrapperStyles}>
            <div className={sectionInnerWrapperStyles}>
              <div className={sectionTextWrapperStyles}>
                <h2>¿Por qué este club?</h2>
                <p>
                  Somos tres personas comprometidas con la divulgación de los
                  Buenos Humos en Zaragoza. Meros aficionados que quieren seguir
                  aprendiendo sobre tabaco y conociendo a personas afines con
                  este placer hedonista que es fumar tabacos premium. Si tienes
                  el mismo desvarío mental, apúntate a este club para que tus
                  ahorros se vayan en tabaco.
                </p>
              </div>
              <div className={sectionImageWrapperStyles}>
                <Image
                  className={imageStyles}
                  src="/Images/club-de-fumadores-zaragoza.jpeg"
                  alt="Club de fumadores en Zaragoza"
                  fill
                />
              </div>
            </div>
          </section>
          {storyblokContent}
        </main>
      )}
    </>
  );
}

export const getStaticProps = async () => {
  const storyblokData = await getStoryblokData("home");

  return {
    props: { storyblokData },
  };
};
