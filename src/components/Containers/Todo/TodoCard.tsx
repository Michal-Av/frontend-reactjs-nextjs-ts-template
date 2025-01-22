// TodoCard.js
import React from 'react';
import { Todo } from '../../../types/Todo'; // Import the Todo interface from types.ts
import TodoHeader from './TodoHeader';
import TodoFooter from './TodoFooter';
import './TodoCard.css'

interface TodoCardProps{
  todo: Todo;
  onComplete: () => void;
  onDelete: () => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onComplete, onDelete }) => {
  const { title, description, status, flag } = todo;

  return (
    <div className='card'>
      <TodoHeader title={title} description={description} />
      <TodoFooter status={status} flag={flag} onComplete={onComplete} onDelete={onDelete} />
    </div>
  );
};

export default TodoCard;
