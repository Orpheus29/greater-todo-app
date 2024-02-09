import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../consts/app-keys.const';
import { todoService } from '../../../api/todos.service';

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const deleteTodo = useMutation((todoId: string) => todoService.deleteTodo(todoId), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.TODOS);
    }
  });

  return deleteTodo;
};
