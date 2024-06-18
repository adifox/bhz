import Head from "next/head";
import Image from "next/image";
import { PhotoGallery } from "@/components/ui-components/photo-gallery";
import { BecomeMember } from "@/components/ui-components/become-member";
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
  console.log("THE STBLOK DATA:", storyblokData);
  const {
    story: { content },
  } = storyblokData.data;

  const [data] = content?.body?.map((story: StoryblokItem) => {
    if (story.component === "imageGallery") {
      return {
        photos: story.photos,
        headline: story.headline,
      };
    }
  });

  console.log("THE GALLERY DATA:", data);

  return (
    <>
      <Head>
        <title>Buenos Humos Zaragoza</title>
        <meta
          name="description"
          content="Club de fumadores Buenos Humos Zaragoza"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
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
            <h2>Bienvenido al club de fumadores Buenos Humos Zaragoza</h2>
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
                aprendiendo sobre tabaco y conociendo a personas afines con este
                placer hedonista que es fumar tabacos premium. Si tienes el
                mismo desvarío mental, apúntate a este club para que tus ahorros
                se vayan en tabaco.
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
        <section className={sectionWrapperStyles}>
          <PhotoGallery headline={data?.headline} photos={data?.photos} />
        </section>
        <section className={sectionWrapperStyles}>
          <BecomeMember />
        </section>
      </main>
      {/* <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>src/pages/index.tsx</code>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Docs <span>-&gt;</span>
            </h2>
            <p>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Learn <span>-&gt;</span>
            </h2>
            <p>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Templates <span>-&gt;</span>
            </h2>
            <p>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Deploy <span>-&gt;</span>
            </h2>
            <p>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div>
      </main> */}
    </>
  );
}

export const getStaticProps = async () => {
  const storyblokData = await getStoryblokData("home");

  return {
    props: { storyblokData },
  };
};
