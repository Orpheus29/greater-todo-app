import React, { FC, useState } from 'react';
import { Box, Button, Checkbox } from '@mui/material';
import { ITodo } from '../../../types/todo.types';
import { TodoControls } from './todo.styled';
import { TodoFormUpdate } from '../todo-form/todo-form-update.component';
import { useUpdateTodo } from '../../../hooks/todo/update-todo.hook';
import { useDeleteTodo } from '../../../hooks/todo/delete-todo.hook';

interface ITodoControlProps {
  todo: ITodo;
}

export const TodoControl: FC<ITodoControlProps> = ({ todo, ...props }) => {
  const [edit, setEdit] = useState(false);
  const deleteTodo = useDeleteTodo();
  const markDone = useUpdateTodo();
  return (
    <>
      {edit && <TodoFormUpdate todo={todo} open={edit} onClose={() => setEdit(false)} />}
      <TodoControls {...props}>
        <Box sx={{ display: 'flex' }}>
          <Button onClick={() => setEdit(true)} size="small" color="primary" variant="contained">
            view
          </Button>
          <Button
            onClick={() => deleteTodo.mutate(todo.id)}
            sx={{ marginLeft: '8px' }}
            size="small"
            color="error"
            variant="contained"
          >
            delete
          </Button>
        </Box>
        <Checkbox
          color="success"
          checked={todo.done}
          onChange={() => {
            markDone.mutate({ id: todo.id, update: { done: !todo.done } });
          }}
          sx={{
            '& .MuiSvgIcon-root': {
              width: '35px',
              height: '35px'
            }
          }}
        />
      </TodoControls>
    </>
  );
};
