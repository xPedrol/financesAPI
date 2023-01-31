export const paginate = (
  page: string | number | null | undefined,
  limit?: number
) => {
  if (page === null || page === undefined) {
    page = 0;
  }
  if (typeof page === "string") {
    page = parseInt(page);
  }
  if (isNaN(page)) {
    page = 0;
  }
  if (page < 0) {
    page = 0;
  }
  limit = limit || 10;
  const offset = (page + 1) * limit - limit;
  return {
    take: limit,
    skip: offset,
  };
};
