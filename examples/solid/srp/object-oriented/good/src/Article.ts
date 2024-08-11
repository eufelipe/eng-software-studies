export interface IArticle {
  title: string;
  content: string;
  author: string;
  id?: string;
  publicationDate?: Date;
}

export default class Article implements IArticle {
  id?: string;
  publicationDate?: Date;

  constructor(
    public title: string,
    public content: string,
    public author: string
  ) {}
}
