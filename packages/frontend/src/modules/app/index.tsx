import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as ThemProviderMUI, createTheme } from '@mui/material';
import { MainRouter } from '../navigation';

import * as theme from '../theme';
import * as Styled from './app.styled';
import '../../style.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      cacheTime: Infinity
    }
  }
});

const themMUI = createTheme({
  palette: {
    primary: {
      main: theme.COLORS.primary
    },
    secondary: {
      main: theme.COLORS.secondary
    }
  }
});

const AppContainer = () => (
  <ThemProviderMUI theme={themMUI}>
    <ThemeProvider theme={theme}>
      <Styled.GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <MainRouter />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  </ThemProviderMUI>
);

export default AppContainer;
