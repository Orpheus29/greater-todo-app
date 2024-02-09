import { useMutation, useQueryClient } from 'react-query';
import { todoService } from '../../../api/todos.service';
import { IUpdateTodo } from '../../types/todo.types';
import { QUERY_KEYS } from '../../consts/app-keys.const';

interface UpdateTodoParams {
  update: IUpdateTodo;
  id: string;
}

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const updateTodo = useMutation(
    ({ update, id }: UpdateTodoParams) => todoService.updateTodo(id, update),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.TODOS);
      }
    }
  );
  return updateTodo;
};
