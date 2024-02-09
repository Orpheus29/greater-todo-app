import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../common/hooks/auth/auth.hook';
import { IUser } from '../../common/types/auth.types';
import { ROUTER_KEYS } from '../../common/consts/app-keys.const';

export const ProfilePage = () => {
  const user = useAuth().data as IUser;
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div>
          <strong>User:</strong> {user.email}
        </div>
        <div>
          <Button
            sx={{ marginTop: 3 }}
            variant="contained"
            color="primary"
            onClick={() => navigate(ROUTER_KEYS.CHANGE_PASSWORD)}
          >
            change password
          </Button>
        </div>
        <Box sx={{ mt: 4 }}>
          <Button color="primary" variant="outlined" onClick={() => navigate(ROUTER_KEYS.HOME)}>
            Back
          </Button>
        </Box>
      </div>
    </Box>
  );
};
