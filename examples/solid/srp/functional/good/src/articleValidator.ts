import { TArticle } from "./types";

export const validateArticle = (article: TArticle): TArticle => {
  if (!article.title || article.title.length < 5) {
    throw new Error("Title is too short");
  }
  if (!article.content || article.content.length < 100) {
    throw new Error("Content is too short");
  }
  return article;
};
