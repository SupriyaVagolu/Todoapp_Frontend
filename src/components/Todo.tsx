import React, { useState } from 'react';
import { useTodos } from '../context/TodoContext';
import TodoItem from './TodoItem';

const Todo: React.FC = () => {
  const { todos, addTodo, editTodo, deleteTodo, filter, setFilter } = useTodos();
  const [newTask, setNewTask] = useState('');

  const filteredTodos = filter === 'all' ? todos : todos.filter(todo => todo.status === filter);

  const handleAddTodo = () => {
    if (newTask.trim()) {
      addTodo(newTask);
      setNewTask('');
    }
  };

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <form role="form" onSubmit={(e) => { e.preventDefault(); handleAddTodo(); }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit" style={{ marginRight: '10px' }}>Add</button>

        <select onChange={(e) => setFilter(e.target.value)} value={filter} style={{ marginLeft: '10px' }}>
          <option value="all">All</option>
          <option value="not_started">Not Started</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </form>
      {todos.length === 0 ? (
          <div className="todo-item">No todos available</div> // Use existing todo-item class
        ): 
        <table>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>Task</th>
            <th style={{ textAlign: 'center' }}>Status</th>
            <th style={{ textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
              
            />
          ))}
        </tbody>
      </table>
        }

    </div>
  );
};

export default Todo;
