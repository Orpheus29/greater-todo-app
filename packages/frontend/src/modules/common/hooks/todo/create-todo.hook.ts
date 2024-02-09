import { useMutation, useQueryClient } from 'react-query';
import { ICreateTodo } from '../../types/todo.types';
import { todoService } from '../../../api/todos.service';
import { QUERY_KEYS } from '../../consts/app-keys.const';

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  const createTodo = useMutation((todo: ICreateTodo) => todoService.createTodo(todo), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.TODOS);
    }
  });
  return createTodo;
};
