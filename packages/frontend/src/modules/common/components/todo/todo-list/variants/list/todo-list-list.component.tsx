import React, { FC, useEffect, useState } from 'react';
import { Alert, Box, CircularProgress } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { ITodo, ITodoFilters } from '../../../../../types/todo.types';
import { TodoComponent } from '../../../todo-element';
import { NoTodos } from '../../todo-list.styled';
import { useGetTodosInfinite } from '../../../../../hooks/todo/get-todos.hook';
import { APP_KEYS } from '../../../../../consts';

interface ITodoListProps {
  filter: ITodoFilters;
}

export const TodoListListComponent: FC<ITodoListProps> = ({ filter, ...props }) => {
  const { data, isLoading, error, hasNextPage, fetchNextPage } = useGetTodosInfinite({
    ...filter,
    take: APP_KEYS.PAGE_SIZE
  });
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isLoading) fetchNextPage();
  }, [inView]);

  const [todos, setTodos] = useState<ITodo[]>(data?.pages.map((page) => page.rows).flat() || []);

  useEffect(() => {
    setTodos(data?.pages.map((p) => p.rows).flat() || []);
  }, [data]);

  return (
    <div>
      {error && (
        <Alert sx={{ width: '80%', margin: '0 auto' }} severity="error">
          {error instanceof Error ? error.message : 'Unexpected Error'}
        </Alert>
      )}
      {!error && !isLoading && todos.length === 0 && <NoTodos>No Todos</NoTodos>}
      {!error &&
        !isLoading &&
        todos.length !== 0 &&
        todos.map((todo) => <TodoComponent key={todo.id} variant="post" todo={todo} />)}
      {!error && (hasNextPage || isLoading) && (
        <Box ref={ref} sx={{ padding: 2, width: '100%' }}>
          <Box sx={{ textAlign: 'center' }} {...props}>
            <CircularProgress color="primary" />
          </Box>
        </Box>
      )}
    </div>
  );
};
