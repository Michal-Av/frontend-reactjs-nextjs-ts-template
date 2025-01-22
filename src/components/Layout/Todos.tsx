'use client';
import React, { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios'; // Import AxiosResponse
import { Todo } from '../../types/Todo'; // Import the Todo interface from types.ts
import TodoCard from '../Containers/Todo/TodoCard';
import { UpdateTodo, deleteTodo, getAllTodos } from '../../services/api-todos';


const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getAllTodos()
      .then((resp: AxiosResponse<Todo[]>) => { // Specify the type of resp as AxiosResponse<Todo[]>
        setTodos(resp.data);
      })
  }, []);

  const onDelete = async (id: string) => {
    await deleteTodo(id);
    setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
  }

  const onComplete = async (id: string) => {
    const obj = {
      status: "Done"
    };
    await UpdateTodo(id, obj);
    setTodos(prevTodos => prevTodos.map(todo => todo._id === id ? { ...todo, status: "Done" } : todo));
  }

  return (
    <div style={{ paddingTop: '10px' }}>
      <h2>Todo List</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        {todos.map(todo => (
          <TodoCard key={todo._id} todo={todo} onComplete={() => onComplete(todo._id)} onDelete={() => onDelete(todo._id)} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
