import { processArticle } from "./processArticle";
import { TArticle } from "./types";

const article: TArticle = {
  title: "The Importance of SOLID Principles",
  content:
    "SOLID principles are fundamental guidelines for writing maintainable and scalable software...",
  author: "João das Couves",
};

function main() {
  try {
    const processedArticle = processArticle(article);
    console.log(processedArticle);
  } catch (error) {
    console.error("Error processing article:", (error as Error).message);
  }
}

main();
