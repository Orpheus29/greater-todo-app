import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { IUserRequest } from '../../types/auth.types';
import { authService } from '../../../api/auth.service';
import { ROUTER_KEYS } from '../../consts/app-keys.const';

export const useRegistration = (setError: Function) => {
  const navigate = useNavigate();
  const register = useMutation(
    (user: IUserRequest) => authService.register(user.email, user.password),
    {
      onSuccess: () => navigate(ROUTER_KEYS.SIGN_IN),
      onError: (e) => {
        if (e instanceof AxiosError && e.response?.data) return setError(e.response.data);
        setError('Unexpected Error');
      }
    }
  );
  return register;
};
