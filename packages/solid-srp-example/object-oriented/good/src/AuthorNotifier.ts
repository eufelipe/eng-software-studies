export default class AuthorNotifier {
  static notify(author: string): void {
    console.log(`Sending email to ${author} about the publication`);
  }
}
