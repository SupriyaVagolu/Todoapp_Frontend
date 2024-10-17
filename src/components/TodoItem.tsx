import React, { useState } from 'react';
import { Todo, useTodos } from '../context/TodoContext';

interface TodoItemProps {
  todo: Todo;
  editTodo: (id: number, updatedTask: string, updatedStatus: 'not_started' | 'active' | 'completed') => void;
  deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, editTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(todo.task);
  const [updatedStatus, setUpdatedStatus] = useState(todo.status);

  const handleUpdate = () => {
    editTodo(todo.id, updatedTask, updatedStatus);
    setIsEditing(false);
  };

  return (
    <tr>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={updatedTask}
            onChange={(e) => setUpdatedTask(e.target.value)}
          />
        ) : (
          <span>{todo.task}</span>
        )}
      </td>
      <td>
        {isEditing ? (
          <select value={updatedStatus} onChange={(e) => setUpdatedStatus(e.target.value as 'not_started' | 'active' | 'completed')}>
            <option value="not_started">Not Started</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        ) : (
          <span>{todo.status.charAt(0).toUpperCase() + todo.status.slice(1).replace('_', ' ')}</span>
        )}
      </td>
      <td>
        {isEditing ? (
          <button onClick={handleUpdate} style={{ marginRight: '10px' }}>Update</button>
        ) : (
          <button onClick={() => setIsEditing(true)} style={{ marginRight: '10px' }}>Edit</button>
        )}
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default TodoItem;
