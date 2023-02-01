import React, { ChangeEvent, FormEvent } from "react";
import TextErrors from "../../../components/TextErrors";
import { usePasswordToggle } from "../../../hooks/usePasswordToggle";
import { LoginFormInitData } from "../../../models/LoginTypes";
import "./LoginForm.css";

type LoginFormProps = {
  value: LoginFormInitData;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  errors: LoginFormInitData;
};

const LoginForm: React.FC<LoginFormProps> = ({
  value,
  handleInputChange,
  handleSubmit,
  errors,
}) => {
  const { inputType, visible, setVisible } = usePasswordToggle();
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="account"  className="form-label" >Email/Phone</label>
        <input
          type="text"
          className="form-control"
          id="account"
          name="account"
          value={value.account}
          onChange={handleInputChange}
        />
      </div>
      {errors.account && <TextErrors error={errors.account} />}

      <div className="form-group mb-3" >
        <label htmlFor="password" className="form-label">Password</label>
        <div className="password">
          <input
            type={inputType}
            className="form-control"
            id="password"
            name="password"
            value={value.password}
            onChange={handleInputChange}
          />
          <span className="password-togle-icon">
            <i
              onClick={() => setVisible(!visible)}
              className={`bi ${visible ? "bi-eye" : "bi-eye-slash"}`}
            ></i>
          </span>
        </div>
      </div>
      {errors.password && <TextErrors error={errors.password} />}
      <button type="submit" className="btn btn-dark w-100 mt-𝟭">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
