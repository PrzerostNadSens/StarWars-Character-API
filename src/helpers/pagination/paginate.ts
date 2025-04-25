import { PaginatedResponse } from './dto/paginated.response.dto';

export function paginate<T>(
  page: number,
  limit: number,
  count: number,
  items: T[],
): PaginatedResponse<T> {
  const maxPage = Math.ceil(count / limit);
  return {
    items,
    pagination: {
      count: items.length,
      totalElements: count,
      page: page,
      pageSize: limit,
      totalPages: maxPage,
      firstPage: page == 0,
      lastPage: page == maxPage,
    },
  };
}
