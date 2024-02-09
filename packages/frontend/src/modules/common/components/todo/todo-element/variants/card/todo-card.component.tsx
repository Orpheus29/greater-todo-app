import React, { FC } from 'react';
import { ITodo } from '../../../../../types/todo.types';
import { TodoDescription, TodoTitle } from '../../todo.styled';
import { CardContainer, CardControls, CardText } from './todo-card.styled';

interface ITodoProps {
  todo: ITodo;
}

export const TodoCard: FC<ITodoProps> = ({ todo, ...props }) => (
  <CardContainer {...props} done={todo.done}>
    <CardText>
      <TodoTitle>{todo.title}</TodoTitle>
      <TodoDescription>{todo.description}</TodoDescription>
    </CardText>
    <CardControls todo={todo} />
  </CardContainer>
);
