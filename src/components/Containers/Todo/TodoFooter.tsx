// TodoFooter.tsx
import React from 'react';
import Badge from '../../UIElements/Badge';
import Button from '../../UIElements/Button';
import {Status, Flag } from '../../../types/Todo';
import './TodoFooter.css'

interface TodoFooterProps { 
  status: Status;
  flag?: Flag;
  onComplete: () => void;
  onDelete: () => void;
}

const TodoFooter: React.FC<TodoFooterProps> = ({ status, onComplete, onDelete }) => {
  return (
    <div className="row justify-content-between">
      <Badge type={status} />
      <div className='right'>
      <Button  onClick={onComplete}>Complete</Button> {" "}
      <Button onClick={onDelete}>Delete</Button>
      </div>
    </div>
  );
};

export default TodoFooter;
