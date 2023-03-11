export const getPaginationParams = (
  obj: any
): { page: number | null; perPage: number | null } => {
  const page = obj.page ? parseInt(obj.page as string) : null;
  const perPage = obj.perPage ? parseInt(obj.perPage as string) : null;
  const pageSize = obj.pageSize ? parseInt(obj.pageSize as string) : null;
  return { page, perPage: pageSize || perPage };
};
