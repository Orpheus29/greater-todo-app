import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { IRequestReset } from '../../types/auth.types';
import { authService } from '../../../api/auth.service';

export const useRequestReset = (setMessage: Function, setError: Function) => {
  const reset = useMutation((user: IRequestReset) => authService.requestReset(user.email), {
    onSuccess: () => {
      setMessage('Instruction to reset password was sent on your email');
      setError('');
    },
    onError: (e) => {
      if (e instanceof AxiosError && e.response?.data) return setError(e.response.data);
      setError('Unexpected Error');
    }
  });
  return reset;
};
