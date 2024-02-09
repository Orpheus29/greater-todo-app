import { ITodoFilters } from '../types/todo.types';

export const PAGE_SIZE = 5;

// Local storage keys
export const STORAGE_KEYS = {
  JWT_TOKEN: 'token'
};

// React-query keys
export const QUERY_KEYS = {
  TODOS: ['todos'],
  TODOS_FILTER: (filters: ITodoFilters) => ['todos', filters],
  AUTH: 'auth'
};

// Backend Routes
export const BACKEND_KEYS = {
  SERVER_URL: 'http://localhost:4200',
  TODOS: 'todos',
  AUTH: 'user',
  REGISTER: 'register',
  LOGIN: 'login',
  REQUEST_RESET: 'request-reset',
  RESET_PASSWORD: (id: string) => `/reset-password/${id}`,
  CHANGE_PASSWORD: (id: string) => `/change-password/${id}`,
  GET_USER: 'get-user'
};

export const ROUTER_KEYS = {
  SIGN_IN: '/login',
  HOME: '/',
  PROFILE: '/profile',
  SIGN_UP: '/registration',
  REQUEST_RESET: '/request-reset',
  RESET_PASSWORD: '/reset/:id',
  CHANGE_PASSWORD: '/change-password'
};
