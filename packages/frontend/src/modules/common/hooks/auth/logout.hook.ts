import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../api/auth.service';
import { ROUTER_KEYS } from '../../consts/app-keys.const';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const logout = useMutation(() => authService.logout(), {
    onSuccess: () => {
      navigate(ROUTER_KEYS.SIGN_IN);
      queryClient.clear();
    }
  });
  return logout;
};
