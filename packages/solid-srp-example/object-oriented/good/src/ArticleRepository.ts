import { IArticle } from "./Article";

export default class ArticleRepository {
  static save(article: IArticle): string {
    const id = Math.random().toString(36).slice(2, 11);
    console.log(`Saving article with ID ${id} to database`);
    return id;
  }
}
