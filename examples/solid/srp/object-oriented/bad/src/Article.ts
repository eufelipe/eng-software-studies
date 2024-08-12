class Article {
  private id: string | null = null;
  publicationDate: Date | null = null;

  constructor(
    private title: string,
    private content: string,
    private author: string
  ) {}

  process(): Article {
    // Validation
    if (!this.title || this.title.length < 5) {
      throw new Error('Title is too short');
    }
    if (!this.content || this.content.length < 50) {
      throw new Error('Content is too short');
    }

    // Formatting
    this.title = this.title.toLowerCase().replace(/\s+/g, '-');
    this.content = this.content.replace(/\n/g, '<br />');

    // Save to database
    this.id = Math.random().toString(36).slice(2, 11);
    console.log(`Saving article with ID ${this.id} to database`);

    // Set publication date
    this.publicationDate = new Date();

    // Notify author
    console.log(`Sending email to ${this.author} about the publication`);

    return this;
  }
}

export default Article;