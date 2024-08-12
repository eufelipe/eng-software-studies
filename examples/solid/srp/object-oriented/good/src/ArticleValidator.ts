import { IArticle } from "./Article";

export default class ArticleValidator {
  static validate(article: IArticle): void {
    if (!article.title || article.title.length < 3) {
      throw new Error("Title is too short");
    }
    if (!article.content || article.content.length < 50) {
      throw new Error("Content is too short");
    }
  }
}
