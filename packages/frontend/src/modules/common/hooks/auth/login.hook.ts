import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { IUserRequest } from '../../types/auth.types';
import { authService } from '../../../api/auth.service';
import { QUERY_KEYS, ROUTER_KEYS } from '../../consts/app-keys.const';

export const useLogin = (setError: Function) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const login = useMutation((user: IUserRequest) => authService.login(user.email, user.password), {
    onSuccess: async () => {
      navigate(ROUTER_KEYS.HOME);
      queryClient.invalidateQueries(QUERY_KEYS.AUTH);
    },
    onError: (e) => {
      if (e instanceof AxiosError && e.response?.data) return setError(e.response.data);
      setError('Unexpected Error');
    }
  });
  return login;
};
