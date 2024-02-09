import { useInfiniteQuery, useQuery } from 'react-query';
import { todoService } from '../../../api/todos.service';
import { QUERY_KEYS } from '../../consts/app-keys.const';
import { ITodoFilters, ITodoQueries } from '../../types/todo.types';

export const useGetTodos = (filters: ITodoQueries) =>
  useQuery(
    QUERY_KEYS.TODOS_FILTER(filters),
    async () => {
      const todos = await todoService.getTodos(filters);
      return todos;
    },
    { refetchOnMount: true }
  );

interface ITodoInfiniteParams extends ITodoFilters {
  take: number;
}

export const useGetTodosInfinite = (filters: ITodoInfiniteParams) =>
  useInfiniteQuery({
    queryKey: QUERY_KEYS.TODOS_FILTER(filters),
    queryFn: async ({ pageParam = 1 }) => {
      const todos = await todoService.getTodos({ ...filters, page: pageParam });
      return todos;
    },
    getNextPageParam: (lastPage) => {
      const next = lastPage.curPage + 1;
      return next <= lastPage.pages ? next : undefined;
    },
    refetchOnMount: true
  });
