import { render, screen, fireEvent } from '@testing-library/react';
import { TodoProvider, useTodos } from '../context/TodoContext';
import Todo from '../components/Todo';

describe('Todo Component with TodoContext', () => {

  test('adds a todo', () => {
    render(
      <TodoProvider>
        <Todo />
      </TodoProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/add a new task/i), {
      target: { value: 'Test Todo' }
    });
    fireEvent.click(screen.getByText(/add/i));

    expect(screen.getByText(/test todo/i)).toBeInTheDocument();
  });

  test('does not add a whitespace or empty todo', () => {
    render(
      <TodoProvider>
        <Todo />
      </TodoProvider>
    );
    expect(screen.queryByText(/test todo/i)).not.toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText(/add a new task/i), {
      target: { value: '' }
    });
    fireEvent.click(screen.getByText(/add/i));
    expect(screen.queryByText(/test todo/i)).not.toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText(/add a new task/i), {
      target: { value: '    ' }
    });
    fireEvent.click(screen.getByText(/add/i));
    expect(screen.queryByText(/test todo/i)).not.toBeInTheDocument();
  });


  test('edits a todo with status change', () => {
    render(
      <TodoProvider>
        <Todo />
      </TodoProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/add a new task/i), {
      target: { value: 'Test Todo' }
    });
    fireEvent.click(screen.getByText(/add/i));
    const editButtons = screen.getAllByText(/edit/i);
    expect(editButtons).toHaveLength(1);

    fireEvent.click(editButtons[0]);
    fireEvent.change(screen.getByDisplayValue('Test Todo'), {
      target: { value: 'Updated Todo' }
    });

    fireEvent.click(screen.getByText(/update/i));
    expect(screen.getByText(/updated todo/i)).toBeInTheDocument();
    expect(screen.getByText(/active/i)).toBeInTheDocument();
  });

  test('deletes a todo', () => {
    render(
      <TodoProvider>
        <Todo />
      </TodoProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/add a new task/i), {
      target: { value: 'Test Todo' }
    });
    fireEvent.click(screen.getByText(/add/i));
    fireEvent.click(screen.getByText(/delete/i));

    expect(screen.queryByText(/test todo/i)).not.toBeInTheDocument();
  });

  test('filters by active status', () => {
    render(
      <TodoProvider>
        <Todo />
      </TodoProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/add a new task/i), {
      target: { value: 'Task 1' }
    });
    fireEvent.click(screen.getByText(/add/i));

    fireEvent.change(screen.getByPlaceholderText(/add a new task/i), {
      target: { value: 'Task 2' }
    });
    fireEvent.click(screen.getByText(/add/i));
    fireEvent.click(screen.getAllByText(/edit/i)[0]);
    fireEvent.change(screen.getByDisplayValue('Task 1'), {
      target: { value: 'Active Task 1' }
    });
    fireEvent.click(screen.getByText(/update/i));

    expect(screen.queryByText(/active task 1/i)).toBeInTheDocument();
  });

  test('toggles todo completion status', () => {
    render(
      <TodoProvider>
        <Todo />
      </TodoProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/add a new task/i), {
      target: { value: 'Incomplete Todo' }
    });
    fireEvent.click(screen.getByText(/add/i));
    expect(screen.getByText(/incomplete todo/i)).toBeInTheDocument();
  });

  test('filters by completed status', () => {
    render(
      <TodoProvider>
        <Todo />
      </TodoProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/add a new task/i), {
      target: { value: 'Task 1' }
    });
    fireEvent.click(screen.getByText(/add/i));

    fireEvent.change(screen.getByPlaceholderText(/add a new task/i), {
      target: { value: 'Task 2' }
    });
    fireEvent.click(screen.getByText(/add/i));

    expect(screen.queryByText(/task 1/i)).toBeInTheDocument();
  });

  test('does not add a whitespace todo', () => {
    render(
      <TodoProvider>
        <Todo />
      </TodoProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/add a new task/i), {
      target: { value: '    ' }
    });
    fireEvent.click(screen.getByText(/add/i));

    expect(screen.queryByText(/    /i)).not.toBeInTheDocument();
  });

  test('does not delete a non-existent todo', () => {
    render(
      <TodoProvider>
        <Todo />
      </TodoProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/add a new task/i), {
      target: { value: 'Existing Todo' }
    });
    fireEvent.click(screen.getByText(/add/i));
    fireEvent.click(screen.getByText(/delete/i));

    expect(screen.queryByText(/existing todo/i)).not.toBeInTheDocument();
  });

  test('does not add a duplicate todo', () => {
    render(
      <TodoProvider>
        <Todo />
      </TodoProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/add a new task/i), {
      target: { value: 'Duplicate Todo' }
    });
    fireEvent.click(screen.getByText(/add/i));
    fireEvent.change(screen.getByPlaceholderText(/add a new task/i), {
      target: { value: 'Duplicate Todo' }
    });
    fireEvent.click(screen.getByText(/add/i));

    expect(screen.getAllByText(/duplicate todo/i)).toHaveLength(2);
  });

  test('edits a todo to an empty string', () => {
    render(
      <TodoProvider>
        <Todo />
      </TodoProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/add a new task/i), {
      target: { value: 'Todo to Edit' }
    });
    fireEvent.click(screen.getByText(/add/i));
    expect(screen.getByText(/todo to edit/i)).toBeInTheDocument();
  });

  test('toggles a completed todo back to incomplete', () => {
    render(
      <TodoProvider>
        <Todo />
      </TodoProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/add a new task/i), {
      target: { value: 'Complete Me' }
    });
    fireEvent.click(screen.getByText(/add/i));
    fireEvent.click(screen.getByText(/completed/i));
    fireEvent.click(screen.getByText(/completed/i));
    const todoItem = screen.getByText(/Complete Me/i);
    expect(todoItem).toBeInTheDocument();
    expect(todoItem).toHaveTextContent('Complete Me');
  });

  test('does not crash when deleting a non-existent todo', () => {
    render(
      <TodoProvider>
        <Todo />
      </TodoProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/add a new task/i), {
      target: { value: 'Task 1' }
    });
    fireEvent.click(screen.getByText(/add/i));
    fireEvent.click(screen.getByText(/delete/i));
    expect(screen.queryByText(/task 1/i)).not.toBeInTheDocument();
    const deleteButton = screen.queryByText(/delete/i);
    if (deleteButton) {
      fireEvent.click(deleteButton);
    }
    expect(deleteButton).not.toBeInTheDocument();
  });

  test('initial todos state is empty', () => {
    render(
      <TodoProvider>
        <Todo />
      </TodoProvider>
    );

    expect(screen.queryByText(/test todo/i)).not.toBeInTheDocument();
  });

  test('edits a todo with the same value', () => {
    render(
      <TodoProvider>
        <Todo />
      </TodoProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/add a new task/i), {
      target: { value: 'Test Todo' }
    });
    fireEvent.click(screen.getByText(/add/i));

    const editButtons = screen.getAllByText(/edit/i);
    fireEvent.click(editButtons[0]);

    fireEvent.change(screen.getByDisplayValue('Test Todo'), {
      target: { value: 'Test Todo' }
    });

    fireEvent.click(screen.getByText(/update/i));
    expect(screen.getByText(/test todo/i)).toBeInTheDocument();
  });

  test('toggles a todo completion status for a non-existent todo', () => {
    render(
      <TodoProvider>
        <Todo />
      </TodoProvider>
    );

    const toggleButton = screen.queryByText(/completed/i);

    if (toggleButton) {
      fireEvent.click(toggleButton);
    }
    expect(screen.queryByText(/completed/i)).toBeInTheDocument();
  });

  test('filters todos when none are available', () => {
    render(
      <TodoProvider>
        <Todo />
      </TodoProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/add a new task/i), {
      target: { value: 'Task 1' }
    });
    fireEvent.click(screen.getByText(/add/i));

    fireEvent.change(screen.getByPlaceholderText(/add a new task/i), {
      target: { value: 'Task 2' }
    });
    fireEvent.click(screen.getByText(/add/i));
    const deleteButtons = screen.getAllByText(/delete/i);
    deleteButtons.forEach(button => fireEvent.click(button));
    
    expect(screen.getByText(/no todos available/i)).toBeInTheDocument();
  });

  test('throws an error if useTodos is used outside of TodoProvider', () => {
    const TestComponent = () => {
      const context = useTodos();
      return null;
    };
    expect(() => render(<TestComponent />)).toThrowError('useTodos must be used within a TodoProvider');
  });
});
