'use client';
import { PropsWithChildren } from 'react';
import './globals.css';

import { ThemeProvider } from '@mui/material';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalTheme } from './GlobalTheme';
import { ClerkProvider } from '@clerk/nextjs';

const Provider = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={GlobalTheme}>
        {children}
        <ToastContainer position='top-center' />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Provider;
