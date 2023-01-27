export const formatDate = (date: string) => {
  const [month, year] = date.split("/");
  return `${month}-01-${year}`;
};
