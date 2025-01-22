import React from 'react';

interface BadgeProps {
  type: string;
}

const Badge: React.FC<BadgeProps> = ({ type }) => {
  let badgeStyle;

  switch (type) {
    case 'Open':
      badgeStyle = { backgroundColor: '#ff6347' }; // Red
      break;
    case 'In Progress':
      badgeStyle = { backgroundColor: '#ffa500' }; // Orange
      break;
    case 'Done':
      badgeStyle = { backgroundColor: '#32cd32' }; // Green
      break;
    default:
      badgeStyle = {};
  }

  return <span style={{ ...badgeStyle, padding: '5px 10px', borderRadius: '5px', color: '#fff' }}>{type}</span>;
};

export default Badge;
