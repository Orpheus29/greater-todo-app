import { Response, Request } from 'express';
import TodoService from '../services/todo.service';
import { HttpStatus } from '../types/http-status.type';
import { IQueryFilters } from '../types/todo.type';
import { parseTodoQueries } from '../utils/todo-query-parser.util';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(req: Request, res: Response) {
    const { id: userId } = req.user as Express.User;
    const query = req.query as IQueryFilters;
    const [filters, pageable] = parseTodoQueries(query);
    const todos = await this.todoService.findAll(userId, filters, pageable);
    return res.send(todos);
  }

  async getOneTodo(req: Request, res: Response) {
    const { id: userId } = req.user as Express.User;
    const { id } = req.params;
    const todo = await this.todoService.findOne(userId, id);
    res.send(todo);
  }

  async createTodo(req: Request, res: Response) {
    const { id: userId } = req.user as Express.User;
    const { body } = req;
    const todo = await this.todoService.create(userId, body);
    return res.status(HttpStatus.CREATED).send(todo);
  }

  async updateTodo(req: Request, res: Response) {
    const { id: userId } = req.user as Express.User;
    const { body } = req;
    const { id } = req.params;
    await this.todoService.update(userId, id, body);
    return res.send();
  }

  async deleteTodo(req: Request, res: Response) {
    const { id: userId } = req.user as Express.User;
    const { id } = req.params;
    await this.todoService.delete(userId, id);
    return res.send();
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
