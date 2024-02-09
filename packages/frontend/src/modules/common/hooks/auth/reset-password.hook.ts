import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { IResetPassword } from '../../types/auth.types';
import { authService } from '../../../api/auth.service';
import { ROUTER_KEYS } from '../../consts/app-keys.const';

export const useResetPassword = (setError: Function) => {
  const navigate = useNavigate();
  const resetPassword = useMutation(
    (user: IResetPassword) => authService.resetPassword(user.id, user.newPassword),
    {
      onError: (e) => {
        if (e instanceof AxiosError && e.response?.data) return setError(e.response.data);
        setError('Unexpected Error');
      },
      onSuccess: () => {
        navigate(ROUTER_KEYS.SIGN_IN);
      }
    }
  );
  return resetPassword;
};
