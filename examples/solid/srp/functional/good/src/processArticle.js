const validateArticle = (article) => {
  if (!article.title || article.title.length < 5) {
    throw new Error('Title is too short');
  }
  if (!article.content || article.content.length < 100) {
    throw new Error('Content is too short');
  }
  return article;
};

const formatTitle = (title) => {
  return title.toLowerCase().replace(/\s+/g, '-');
};

const formatContent = (content) => {
  return content.replace(/\n/g, '<br>');
};

const saveArticle = (article) => {
  const id = Math.random().toString(36).substr(2, 9);
  console.log(`Saving article with ID ${id} to database`);
  return id;
};

const notifyAuthor = (author) => {
  console.log(`Sending email to ${author} about the publication`);
};

const processArticle = (article) => {
  const validatedArticle = validateArticle(article);
  const formattedTitle = formatTitle(validatedArticle.title);
  const formattedContent = formatContent(validatedArticle.content);
  const id = saveArticle({ ...validatedArticle, title: formattedTitle, content: formattedContent });
  notifyAuthor(validatedArticle.author);

  return {
    id,
    title: formattedTitle,
    content: formattedContent,
    author: validatedArticle.author,
    publicationDate: new Date()
  };
};