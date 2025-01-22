// ButtonLink.tsx
import React from 'react';
import './ButtonLink.css'
interface ButtonProps{
  onClick: () => void;
  children: React.ReactNode;
}

const ButtonLink:React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="link-button">
      {children}
    </button>
  );
};

export default ButtonLink;
