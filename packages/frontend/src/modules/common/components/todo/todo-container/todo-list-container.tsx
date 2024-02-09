import React, { useState } from 'react';
import { TodoListLayout, TodoActionToolsLayout } from './todo-list-container.styled';
import { TodoFormCreate } from '../todo-form/todo-form-create.component';
import { TodoActionTools } from '../todo-action-tools/todo-action-tools.component';
import { ITodoFilters } from '../../../types/todo.types';
import { useDevice } from '../../../hooks/get-device.hook';
import {
  TodoListListComponent,
  TodoListSliderComponent,
  TodoListTableComponent
} from '../todo-list';

export const TodoListContainer = () => {
  const device = useDevice();
  const [filter, setFilter] = useState<ITodoFilters>({ search: '' });
  const [showForm, setShowForm] = useState(false);
  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <TodoFormCreate onClose={closeForm} isOpen={showForm} />
      <TodoActionToolsLayout>
        <TodoActionTools setFilter={setFilter} />
      </TodoActionToolsLayout>

      <TodoListLayout>
        {device === 'desktop' && <TodoListTableComponent filter={filter} />}
        {device === 'tablet' && <TodoListSliderComponent filter={filter} />}
        {device === 'mobile' && <TodoListListComponent filter={filter} />}
      </TodoListLayout>
    </>
  );
};
