import React,{InputHTMLAttributes} from 'react';
import './PasswordInput.css'
import { usePasswordToggle } from '../../../hooks/usePasswordToggle';
import { InputChange } from '../../../utils/types';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    handleChange:(e:InputChange) => void
}


const PasswordInput: React.FC<InputProps> = ({
  id,
  name,
  value,
  placeholder,
  disabled,
    handleChange,
  
}) => {
  const [inputType, visible, setVisible] = usePasswordToggle();

  return (
    <div className="password">
      <input
        type={inputType}
        className="form-control"
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
      />

      <span className="password-togle-icon">
        <i
          onClick={() => setVisible(!visible)}
          className={`bi ${visible ? "bi-eye" : "bi-eye-slash"}`}
        ></i>
      </span>
    </div>
  );
};

export default PasswordInput