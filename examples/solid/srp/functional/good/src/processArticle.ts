import { formatContent, formatTitle } from "./articleFormatter";
import { saveArticle } from "./articleRepository";
import { validateArticle } from "./articleValidator";
import { notifyAuthor } from "./AuthorNotifier";
import { TArticle } from "./types";

export const processArticle = (article: TArticle): TArticle => {
  const validatedArticle = validateArticle(article);
  const formattedTitle = formatTitle(validatedArticle.title);
  const formattedContent = formatContent(validatedArticle.content);

  const id = saveArticle({
    ...validatedArticle,
    title: formattedTitle,
    content: formattedContent,
  });

  notifyAuthor(validatedArticle.author);

  return {
    id,
    title: formattedTitle,
    content: formattedContent,
    author: validatedArticle.author,
    publicationDate: new Date(),
  };
};
