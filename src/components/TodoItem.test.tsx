import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from '../components/TodoItem';
import { Todo } from '../context/TodoContext';

const mockTodo: Todo = {
  id: 1,
  task: 'Test Todo',
  completed: false,
  status: 'not_started',
};

test('allows editing a todo task', () => {
  const mockEditTodo = jest.fn();
  const mockDeleteTodo = jest.fn();

  render(
    <TodoItem
      todo={mockTodo}
      editTodo={mockEditTodo}
      deleteTodo={mockDeleteTodo}
    />
  );
  expect(screen.getByText(/test todo/i)).toBeInTheDocument();
  fireEvent.click(screen.getByText(/edit/i));
  const input = screen.getByDisplayValue(/test todo/i);
  fireEvent.change(input, { target: { value: 'Updated Todo' } });
  fireEvent.change(screen.getByDisplayValue(/not started/i), { target: { value: 'not_started' } }); 
  fireEvent.click(screen.getByText(/update/i));
  expect(mockEditTodo).toHaveBeenCalledWith(1, 'Updated Todo', 'not_started');
});

test('deletes a todo when the delete button is clicked', () => {
  const mockEditTodo = jest.fn();
  const mockDeleteTodo = jest.fn();

  render(
    <TodoItem
      todo={mockTodo}
      editTodo={mockEditTodo}
      deleteTodo={mockDeleteTodo}
    />
  );
  expect(screen.getByText(/test todo/i)).toBeInTheDocument();
  fireEvent.click(screen.getByText(/delete/i));
  expect(mockDeleteTodo).toHaveBeenCalledWith(1);
});
