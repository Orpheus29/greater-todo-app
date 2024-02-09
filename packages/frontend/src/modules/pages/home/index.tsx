import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../common/hooks/auth/logout.hook';
import { ROUTER_KEYS } from '../../common/consts/app-keys.const';
import { TodoListContainer } from '../../common/components/todo/todo-container/todo-list-container';

const HomePageContainer = () => {
  const logout = useLogout();
  const navigate = useNavigate();
  const onProfile = () => navigate(ROUTER_KEYS.PROFILE);
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingTop: 2,
          paddingRight: 4,
          marginBottom: 3
        }}
      >
        <Button onClick={onProfile} sx={{ marginRight: 1 }} color="primary" variant="contained">
          Profile
        </Button>
        <Button color="primary" onClick={() => logout.mutate()}>
          Log out
        </Button>
      </Box>
      <TodoListContainer />
    </>
  );
};
export default HomePageContainer;
