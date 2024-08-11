export default class ArticleFormatter {
  static formatTitle(title: string): string {
    return title.toLowerCase().replace(/\s+/g, "-");
  }

  static formatContent(content: string): string {
    return content.replace(/\n/g, "<br>");
  }
}
