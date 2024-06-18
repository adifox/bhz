export const handleArticleLinks = (storyblokLinks) => {
  const articlePaths = Object.values(storyblokLinks.data.links).map(
    (article) => article.slug
  );

  let paths = [];
  articlePaths.forEach((article) => {
    article.split("/").filter((element) => {
      if (element !== "" && element !== "coches" && element !== "motos") {
        const slug = { params: { article: element } };
        paths.push(slug);
      }
    });
  });

  return paths;
};
