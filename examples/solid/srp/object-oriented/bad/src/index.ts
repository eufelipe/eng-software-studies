import Article from "./Article";

function main() {
  try {
    const article = new Article(
      "The Importance of SOLID Principles",
      "SOLID principles are fundamental guidelines for writing maintainable and scalable software...",
      "João das Couves"
    );

    const processedArticle = article.process();
    console.log(processedArticle);
  } catch (error) {
    console.error("Error processing article:", (error as Error).message);
  }
}

main();
