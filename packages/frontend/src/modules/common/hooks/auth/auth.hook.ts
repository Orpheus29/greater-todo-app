import { useQuery } from 'react-query';
import { IUser } from '../../types/auth.types';
import { authService } from '../../../api/auth.service';
import { QUERY_KEYS } from '../../consts/app-keys.const';

export const useAuth = () => {
  const auth = useQuery<IUser>(QUERY_KEYS.AUTH, () => authService.getUser(), {
    retry: 0,
    staleTime: 0
  });
  return auth;
};
