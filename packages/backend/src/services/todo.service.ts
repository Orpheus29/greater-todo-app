import { ILike } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import {
  IUpdateToDo,
  ICreateTodo,
  ITodoFilters,
  ITodoPageable,
  ITodoPageableResponse
} from '../types/todo.type';

export default class TodoService {
  async findAll(
    userId: string,
    filters: ITodoFilters,
    pageable: ITodoPageable
  ): Promise<ITodoPageableResponse> {
    const { page, take } = pageable;
    const { search, done, isPrivate } = filters;
    const [todos, count] = await Todo.findAndCount({
      take,
      skip: (page - 1) * take,
      where: {
        user: { id: userId },
        done,
        isPrivate,
        title: ILike(`%${search}%`)
      },
      order: { id: 'ASC' }
    });
    return { curPage: page, rows: todos, pages: Math.ceil(count / take) };
  }

  async findOne(userId: string, id: string): Promise<Todo | null> {
    const todo = await Todo.findOne({ where: { id, user: { id: userId } } });
    return todo;
  }

  async create(
    userId: string,
    { title, description, isPrivate, done }: ICreateTodo
  ): Promise<Todo> {
    const todo = await Todo.create({
      title,
      description,
      isPrivate,
      done,
      user: { id: userId }
    }).save();
    delete todo.user;
    return todo;
  }

  async update(userId: string, id: string, updateDto: IUpdateToDo) {
    await Todo.update({ id, user: { id: userId } }, updateDto);
  }

  async delete(userId: string, id: string) {
    await Todo.delete({ id, user: { id: userId } });
  }
}
