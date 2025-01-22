import React from 'react';

interface LangChangerProps {
  onLanguageChange: () => void;
}

const LangChanger: React.FC<LangChangerProps> = ({ onLanguageChange }) => {
  return (
    <div className="col-auto">
      <button onClick={onLanguageChange}>Change Language</button>
    </div>
  );
};

export default LangChanger;
