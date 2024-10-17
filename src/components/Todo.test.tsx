import { render, screen, fireEvent } from '@testing-library/react';
import Todo from '../components/Todo';
import { TodoProvider } from '../context/TodoContext';
import React from 'react';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<TodoProvider>{ui}</TodoProvider>);
};

describe('Todo Component', () => {
  test('renders initial state', () => {
    renderWithProvider(<Todo />);
    expect(screen.getByText(/todo list/i)).toBeInTheDocument();
  });

  test('does not add a todo if input is empty', () => {
    renderWithProvider(<Todo />);
    fireEvent.click(screen.getByText(/add/i)); 
    expect(screen.queryByText(/test todo/i)).not.toBeInTheDocument();
  });

  test('adds a new todo', () => {
    renderWithProvider(<Todo />);
    
    fireEvent.change(screen.getByPlaceholderText(/add a new task/i), {
      target: { value: 'Test Todo' }
    });
    fireEvent.click(screen.getByText(/add/i));

    expect(screen.getByText(/test todo/i)).toBeInTheDocument();
  });

  test('filters todos correctly', () => {
    renderWithProvider(<Todo />);
    
    fireEvent.change(screen.getByPlaceholderText(/add a new task/i), {
      target: { value: 'Todo 1' }
    });
    fireEvent.click(screen.getByText(/add/i));

    fireEvent.change(screen.getByPlaceholderText(/add a new task/i), {
      target: { value: 'Todo 2' }
    });
    fireEvent.click(screen.getByText(/add/i));

    fireEvent.change(screen.getByDisplayValue(/all/i), {
      target: { value: 'completed' }
    });

    expect(screen.queryByText(/todo 1/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/todo 2/i)).not.toBeInTheDocument();
  });
});
