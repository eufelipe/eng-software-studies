import { IArticle } from "./Article";
import ArticleFormatter from "./ArticleFormatter";
import ArticleRepository from "./ArticleRepository";
import ArticleValidator from "./ArticleValidator";
import AuthorNotifier from "./AuthorNotifier";

export default class ArticleProcessor {
  static process(article: IArticle): IArticle {
    ArticleValidator.validate(article);

    article.title = ArticleFormatter.formatTitle(article.title);
    article.content = ArticleFormatter.formatContent(article.content);

    article.id = ArticleRepository.save(article);
    article.publicationDate = new Date();

    AuthorNotifier.notify(article.author);

    return article;
  }
}
