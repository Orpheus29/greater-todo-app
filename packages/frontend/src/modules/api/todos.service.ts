import { APP_KEYS } from '../common/consts';
import {
  ICreateTodo,
  ITodo,
  ITodoPageResponse,
  ITodoQueries,
  IUpdateTodo
} from '../common/types/todo.types';
import HttpService from './http.service';

class TodoService extends HttpService {
  constructor(private backendKey: string = APP_KEYS.BACKEND_KEYS.TODOS) {
    super();
    this.getTodos = this.getTodos.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  async getTodos(queries: ITodoQueries) {
    const { data } = await this.get<ITodoPageResponse>(
      {
        url: this.backendKey,
        params: queries
      },
      true
    );
    return data;
  }

  async createTodo(todo: ICreateTodo) {
    const { data } = await this.post<ITodo>(
      {
        url: this.backendKey,
        data: todo
      },
      true
    );
    return data;
  }

  async updateTodo(id: string, data: IUpdateTodo) {
    const { data: resData } = await this.patch<string>(
      { url: `${this.backendKey}/${id}`, data },
      true
    );
    return resData;
  }

  async deleteTodo(id: string) {
    const { data } = await this.delete<string>({ url: `${this.backendKey}/${id}` }, true);
    return data;
  }
}

export const todoService = new TodoService();
