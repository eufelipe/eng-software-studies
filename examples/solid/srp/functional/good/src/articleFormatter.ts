export const formatTitle = (title: string) => {
  return title.toLowerCase().replace(/\s+/g, "-");
};

export const formatContent = (content: string) => {
  return content.replace(/\n/g, "<br>");
};
