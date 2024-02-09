import React, { FunctionComponent, useEffect } from 'react';
import { Box, Button, Modal, Switch, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { TodoFormContainer, TodoFormTitle } from './todo-form.styled';
import { ITodo } from '../../../types/todo.types';
import { todoFormSchema } from '../../../utils/todo-form-validation.util';
import { useUpdateTodo } from '../../../hooks/todo/update-todo.hook';

interface Props {
  onClose: Function;
  open: boolean;
  todo: ITodo;
}

interface Values {
  title: string;
  description: string;
  done: boolean;
  isPrivate: boolean;
}

export const TodoFormUpdate: FunctionComponent<Props> = ({ todo, onClose, open }) => {
  const updateTodo = useUpdateTodo();
  const initialValues: Values = {
    title: todo.title,
    description: todo.description,
    done: todo.done,
    isPrivate: todo.isPrivate
  };

  const formik = useFormik<Values>({
    initialValues,
    onSubmit: (values, actions) => {
      updateTodo.mutate({ id: todo.id, update: values });
      actions.setSubmitting(false);
      onClose();
    },
    validationSchema: todoFormSchema
  });

  useEffect(() => {
    formik.setTouched({ title: false, description: false });
  }, [open]);

  const onCloseHandler = () => onClose();
  return (
    <Modal onClose={onCloseHandler} open={open}>
      <TodoFormContainer done={todo.done} onSubmit={formik.handleSubmit}>
        <TodoFormTitle>Todo View</TodoFormTitle>
        <TextField
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.title ? formik.errors.title : null}
          error={formik.touched.title && !!formik.errors.title}
          sx={{ width: '100%' }}
          label="title"
          variant="standard"
          color="primary"
        />
        <TextField
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && !!formik.errors.description}
          onBlur={formik.handleBlur}
          helperText={formik.touched.description ? formik.errors.description : null}
          color="primary"
          maxRows={5}
          multiline
          sx={{ marginTop: '20px', marginBottom: '20px', width: '100%' }}
          label="description"
          variant="standard"
        />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '50px', color: 'gray', marginRight: 4 }}>Private</Box>
          <Switch
            name="isPrivate"
            checked={formik.values.isPrivate}
            onChange={formik.handleChange}
            color="primary"
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '50px', color: 'gray', marginRight: 4 }}>Completed</Box>
          <Switch
            name="done"
            checked={formik.values.done}
            onChange={formik.handleChange}
            color="success"
          />
        </Box>
        <Button sx={{ alignSelf: 'flex-end' }} variant="contained" color="primary" type="submit">
          update
        </Button>
      </TodoFormContainer>
    </Modal>
  );
};
