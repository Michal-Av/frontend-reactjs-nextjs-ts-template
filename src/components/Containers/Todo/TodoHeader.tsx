// TodoHeader.tsx
import React from 'react';
import Text from '../../UIElements/Text';

interface TodoHeaderProps {
  title: string;
  description?: string;
}

const TodoHeader: React.FC<TodoHeaderProps> = ({ title, description }) => {
  return (
    <div>
      <h4><Text>{title}</Text></h4>
      <Text>{description}</Text>
    </div>
  );
};

export default TodoHeader;
