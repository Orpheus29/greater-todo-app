import React, { FC } from 'react';
import { ITodo } from '../../../types/todo.types';
import { TodoRow } from './variants/row/todo-row.component';
import { TodoCard } from './variants/card/todo-card.component';
import { TodoPost } from './variants/post/todo-post.component';

interface ITodoProps {
  todo: ITodo;
  variant: 'row' | 'post' | 'card';
}

export const TodoComponent: FC<ITodoProps> = ({ variant = 'post', todo, ...props }) => (
  <>
    {variant === 'row' && <TodoRow {...props} todo={todo} />}
    {variant === 'post' && <TodoPost {...props} todo={todo} />}
    {variant === 'card' && <TodoCard {...props} todo={todo} />}
  </>
);
