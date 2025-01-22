import React from 'react';
import InputField from '../../UIElements/Input/InputField';
import './FormField.css';

interface FormFieldProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({ label, type, name, placeholder, value, onChange }) => (
  <div>
    {label} <InputField type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />
  </div>
);

export default FormField;
