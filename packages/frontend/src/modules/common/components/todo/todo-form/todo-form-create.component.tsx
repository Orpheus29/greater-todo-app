import React, { FunctionComponent, useEffect } from 'react';
import { Box, Button, Modal, Switch, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { TodoFormContainer, TodoFormTitle } from './todo-form.styled';
import { todoFormSchema } from '../../../utils/todo-form-validation.util';
import { useCreateTodo } from '../../../hooks/todo/create-todo.hook';
import { CREATE_TODO_INITIAL } from '../../../consts/todo-form.consts';

interface Props {
  onClose: Function;
  isOpen: boolean;
}

interface Values {
  title: string;
  description: string;
  done: boolean;
  isPrivate: boolean;
}

export const TodoFormCreate: FunctionComponent<Props> = ({ onClose, isOpen }) => {
  const createTodo = useCreateTodo();

  const formik = useFormik<Values>({
    initialValues: CREATE_TODO_INITIAL,
    onSubmit: (values, actions) => {
      createTodo.mutate(values);
      actions.setSubmitting(false);
      onClose();
    },
    validationSchema: todoFormSchema
  });

  const onCloseHandler = () => onClose();

  useEffect(() => {
    formik.setValues(CREATE_TODO_INITIAL);
    formik.setTouched({ title: false, description: false });
  }, [isOpen]);
  return (
    <Modal onClose={onCloseHandler} open={isOpen}>
      <TodoFormContainer done={formik.values.done} onSubmit={formik.handleSubmit}>
        <TodoFormTitle>Create Todo</TodoFormTitle>
        <TextField
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.title ? formik.errors.title : null}
          error={formik.touched.title && !!formik.errors.title}
          color="primary"
          sx={{ marginBottom: 1, width: '100%' }}
          label="title"
        />
        <TextField
          name="description"
          value={formik.values.description}
          error={formik.touched.description && !!formik.errors.description}
          onBlur={formik.handleBlur}
          helperText={formik.touched.description ? formik.errors.description : null}
          onChange={formik.handleChange}
          maxRows={5}
          multiline
          sx={{ marginBottom: 1, width: '100%' }}
          label="description"
          color="primary"
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
          create
        </Button>
      </TodoFormContainer>
    </Modal>
  );
};
