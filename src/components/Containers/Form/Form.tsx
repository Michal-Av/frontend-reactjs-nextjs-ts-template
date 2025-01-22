import React, { useState } from 'react';
import FormField from './FormField';
import './Form.css';
import { useTranslation } from 'react-i18next';
import ButtonLink from '../../UIElements/ButtonLink';

interface Field {
  label: string;
  type: string;
  name: string;
  placeholder: string;
}

interface FormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
  message: string;
  fields: Field[];
  buttonText: string;
  actionText: string;
  onActionClick: () => void;
  onForgotClick: () => void;
}

const Form: React.FC<FormProps> = ({ onSubmit, message, fields, buttonText, actionText, onActionClick, onForgotClick }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );
  const { t, i18n } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const formAlignmentClass = i18n.language === 'he' ? 'login-form-right' : 'login-form-left';

  return (
    <div className={`login-form ${formAlignmentClass}`}>
      <h3>{t(actionText)}</h3>
      <div>
        {actionText === t("Log in to your account") && <>{t("Don't have an account?")} <ButtonLink onClick={onActionClick}>{t("Sign Up")}</ButtonLink></>}
        {actionText === t("Create your account") && <>{t("Have an account?")} <ButtonLink onClick={onActionClick}>{t("Log in now")}</ButtonLink></>}
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        {fields.map(field => (
          <div key={field.name}>
            <FormField
              label={field.label}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
            />
            <br />
          </div>
        ))}

        {actionText === t("Log in to your account") && <><ButtonLink onClick={onForgotClick}>{t("Forgot password?")}</ButtonLink></>}
        <div className="message">{message}</div>
        <br />
        <div>
          <input className='button' type="submit" value={buttonText} />
        </div>
      </form>
    </div>
  );
};

export default Form;
