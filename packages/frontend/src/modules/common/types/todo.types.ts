export interface ITodo {
  id: string;
  title: string;
  description: string;
  done: boolean;
  isPrivate: boolean;
}

export interface ICreateTodo {
  title: string;
  description: string;
  done?: boolean;
  isPrivate: boolean;
}

export type IUpdateTodo = Partial<Omit<ITodo, 'id'>>;

export interface ITodoFilters {
  search: string;
  done?: boolean;
  isPrivate?: boolean;
}

export interface ITodoQueries extends ITodoFilters {
  page: number;
  take: number;
}

export interface ITodoPageResponse {
  rows: ITodo[];
  pages: number;
  curPage: number;
}
