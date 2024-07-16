export const handleArticleLinks = (storyblokLinks) => {
  const articlePaths = Object.values(storyblokLinks.data.links).map(
    (article) => article.slug
  );

  let paths = [];
  articlePaths.forEach((article) => {
    article.split("/").filter((element) => {
      if (element !== "" && element !== "blog") {
        const slug = { params: { article: element } };
        paths.push(slug);
      }
    });
  });

  return paths;
};

export const generateMembershipNumber = (name) => {
  const timestamp = Date.now();
  const seed = name.length + timestamp;

  // Use the seed to generate a random number
  const randomNum = Math.floor(Math.random() * seed);

  // Ensure the random number is not longer than 6 characters
  const maxLength = 6;
  const randomNumStr = randomNum.toString().slice(0, maxLength);

  // Convert back to number
  const finalRandomNum = parseInt(randomNumStr, 10);

  return finalRandomNum;
};
