import React, { FC } from 'react';
import { TableCell } from '@mui/material';
import { ITodo } from '../../../../../types/todo.types';
import { TableRowStyled } from './todo-row.styled';
import { TodoControl } from '../../todo-control.component';

interface ITodoProps {
  todo: ITodo;
}

const CellStyles = {
  border: 'none',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  whiteSpace: 'pre-line'
};

export const TodoRow: FC<ITodoProps> = ({ todo, ...props }) => (
  <TableRowStyled {...props} key={todo.description + todo.title} done={todo.done}>
    <TableCell sx={{ ...CellStyles, width: '25%' }} component="th" scope="row">
      {todo.title}
    </TableCell>
    <TableCell sx={{ ...CellStyles, width: '75%' }} align="left">
      {todo.description}
    </TableCell>
    <TableCell sx={{ border: 'none' }} align="left">
      <TodoControl todo={todo} />
    </TableCell>
  </TableRowStyled>
);
