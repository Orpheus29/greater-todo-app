import React, { FC, useEffect, useState } from 'react';
import {
  Alert,
  CircularProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  SelectChangeEvent,
  MenuItem
} from '@mui/material';
import { TodoListTableContainer } from './todo-list-table.styled';
import { ITodo, ITodoFilters } from '../../../../../types/todo.types';
import { TodoComponent } from '../../../todo-element';
import { NoTodos } from '../../todo-list.styled';
import { useGetTodos } from '../../../../../hooks/todo/get-todos.hook';
import { COLORS } from '../../../../../../theme';

interface ITodoListProps {
  filter: ITodoFilters;
}

export const TodoListTableComponent: FC<ITodoListProps> = ({ filter, ...props }) => {
  const [page, setPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(5);
  const { data, isLoading, error } = useGetTodos({ ...filter, take: todosPerPage, page });

  const [todos, setTodos] = useState<ITodo[]>(data?.rows || []);
  useEffect(() => {
    setTodos(data?.rows || []);
  }, [data]);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleTodosPerPageChange = (event: SelectChangeEvent<number>) => {
    setTodosPerPage(event.target.value as number);
    setPage(1);
  };

  return (
    <>
      {error && (
        <Alert sx={{ width: '80%', margin: '0 auto' }} severity="error">
          {error instanceof Error ? error.message : 'Unexpected error'}
        </Alert>
      )}
      <TodoListTableContainer {...props}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderColor: COLORS.secondaryDarker }}>
                <strong>Title</strong>
              </TableCell>
              <TableCell sx={{ borderColor: COLORS.secondaryDarker }} align="left">
                <strong>Description</strong>
              </TableCell>
              <TableCell sx={{ borderColor: COLORS.secondaryDarker }} align="left">
                <strong>Options</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!error && isLoading && (
              <TableRow>
                <TableCell sx={{ border: 'none' }} colSpan={3} align="center">
                  <CircularProgress color="primary" />
                </TableCell>
              </TableRow>
            )}
            {!error && !isLoading && todos.length === 0 && (
              <TableRow>
                <TableCell sx={{ border: 'none' }} colSpan={3} align="center">
                  <NoTodos>No Todos</NoTodos>
                </TableCell>
              </TableRow>
            )}
            {!error &&
              !isLoading &&
              todos.length !== 0 &&
              todos.map((todo) => <TodoComponent key={todo.id} variant="row" todo={todo} />)}
          </TableBody>
        </Table>
      </TodoListTableContainer>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '16px'
        }}
      >
        <div>
          <span>Todos per page:</span>
          <Select
            value={todosPerPage}
            onChange={handleTodosPerPageChange}
            style={{ marginLeft: '8px' }}
            variant="outlined"
            sx={{ height: '35px' }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
        </div>
        <Pagination
          sx={{ mt: 2 }}
          count={data?.pages || 1}
          onChange={handleChange}
          page={page}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </div>
    </>
  );
};
