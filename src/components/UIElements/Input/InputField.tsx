import React from 'react';
import './InputField.css';

interface InputFieldProps{
  type: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputField: React.FC<InputFieldProps> = ({ type, name, placeholder, value, onChange }) => (
  <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />
);

export default InputField;
