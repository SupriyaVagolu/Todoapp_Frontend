import React from 'react';
import { TodoProvider } from './context/TodoContext';
import Todo from './components/Todo';
import './App.css';

const App: React.FC = () => {
  return (
    <TodoProvider>
      <div className="App">
        <header className="App-header">
          <Todo />
        </header>
      </div>
    </TodoProvider>
  );
};

export default App;
