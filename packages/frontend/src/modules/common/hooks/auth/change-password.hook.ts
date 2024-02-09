import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { IChangePassword } from '../../types/auth.types';
import { authService } from '../../../api/auth.service';
import { useLogout } from './logout.hook';

export const useChangePassword = (setError: Function) => {
  const logout = useLogout();
  const changePassword = useMutation(
    (user: IChangePassword) =>
      authService.changePassword(user.id, user.oldPassword, user.newPassword),
    {
      onError: (e) => {
        if (e instanceof AxiosError && e.response?.data) return setError(e.response.data);
        setError('Unexpected Error');
      },
      onSuccess: () => {
        logout.mutate();
      }
    }
  );
  return changePassword;
};
