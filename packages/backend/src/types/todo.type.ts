export interface ITodo {
  title: string;
  description: string;
  done: boolean;
  isPrivate: boolean;
}

export type ICreateTodo = {
  title: string;
  description: string;
  done?: boolean;
  isPrivate?: boolean;
};

export type IUpdateToDo = Partial<ITodo>;

export type ITodoFilters = {
  search: string;
  done?: boolean;
  isPrivate?: boolean;
};

export type ITodoPageable = {
  page: number;
  take: number;
};

export type IQueryFilters = {
  page: string;
  take: string;
  search?: string;
  done?: 'true' | 'false';
  isPrivate?: 'true' | 'false';
};

export type ITodoPageableResponse = {
  pages: number;
  curPage: number;
  rows: ITodo[];
};
