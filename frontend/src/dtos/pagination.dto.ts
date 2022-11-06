export type PaginationDto = {
  page: number;
  take: number;
  itemCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
