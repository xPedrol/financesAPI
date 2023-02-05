export const getPaginationParams = (
  obj: any
): { page: number | null; perPage: number | null } => ({
  page: obj.page || null,
  perPage: obj.perPage || null,
});
