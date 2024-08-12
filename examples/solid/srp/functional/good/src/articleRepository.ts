import { TArticle } from "./types";

export const saveArticle = (article: TArticle): string => {
  const id = Math.random().toString(36).slice(2, 9);
  console.log(`Saving article with ID ${id} to database`, article);
  return id;
};
