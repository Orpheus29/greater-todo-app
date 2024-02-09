import { IQueryFilters, ITodoFilters, ITodoPageable } from '../types/todo.type';

export const parseTodoQueries = (query: IQueryFilters): [ITodoFilters, ITodoPageable] => {
  const filters: ITodoFilters = { search: '' };
  if (query.search) filters.search = query.search;
  if (query.done) filters.done = query.done === 'true';
  if (query.isPrivate) filters.isPrivate = query.isPrivate === 'true';
  const pageable = { page: +query.page, take: +query.take };
  return [filters, pageable];
};
