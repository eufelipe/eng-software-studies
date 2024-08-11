const processArticle = (article) => {
  // Validation
  if (!article.title || article.title.length < 5) {
    throw new Error('Title is too short');
  }
  if (!article.content || article.content.length < 100) {
    throw new Error('Content is too short');
  }

  // Formatting
  const formattedTitle = article.title.toLowerCase().replace(/\s+/g, '-');
  const formattedContent = article.content.replace(/\n/g, '<br>');

  // Save to database
  const id = Math.random().toString(36).substr(2, 9);
  console.log(`Saving article with ID ${id} to database`);

  // Notify authors
  console.log(`Sending email to ${article.author} about the publication`);

  return {
    id,
    title: formattedTitle,
    content: formattedContent,
    author: article.author,
    publicationDate: new Date()
  };
};