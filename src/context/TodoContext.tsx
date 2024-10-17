import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Todo {
  id: number;
  task: string;
  completed: boolean;
  status: 'not_started' | 'active' | 'completed';
}

interface TodoContextType {
  todos: Todo[];
  addTodo: (task: string) => void;
  editTodo: (id: number, updatedTask: string, updatedStatus: 'not_started' | 'active' | 'completed') => void;
  deleteTodo: (id: number) => void;
  filter: string;
  setFilter: (filter: string) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>('all');

  const addTodo = (task: string) => {
    if (task.trim() === '') return;
    const newTodo: Todo = {
      id: Date.now(),
      task,
      completed: false,
      status: 'not_started',
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const editTodo = (id: number, updatedTask: string, updatedStatus: 'not_started' | 'active' | 'completed') => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, task: updatedTask, status: updatedStatus } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, editTodo, deleteTodo, filter, setFilter }}>
      {children}
    </TodoContext.Provider>
  );
};
