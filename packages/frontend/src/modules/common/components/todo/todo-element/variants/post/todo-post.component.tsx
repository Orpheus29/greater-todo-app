import React, { FC } from 'react';
import { Divider } from '@mui/material';
import { ITodo } from '../../../../../types/todo.types';
import { TodoDescription, TodoTitle } from '../../todo.styled';
import { PostContainer, PostControls } from './todo-post.styled';
import { COLORS } from '../../../../../../theme';

interface ITodoProps {
  todo: ITodo;
}

export const TodoPost: FC<ITodoProps> = ({ todo, ...props }) => (
  <>
    <PostContainer key={todo.description + todo.title} {...props} done={todo.done}>
      <TodoTitle>{todo.title}</TodoTitle>
      <TodoDescription>{todo.description}</TodoDescription>
      <PostControls todo={todo} />
    </PostContainer>
    <Divider
      variant="fullWidth"
      style={{ backgroundColor: todo.done ? COLORS.doneDivider : COLORS.secondary }}
    />
  </>
);
