import React, { useEffect } from "react";
import TextErrors from "../../../../components/TextErrors";
import { useForm } from "../../../../hooks/useForm";
import { usePasswordToggle } from "../../../../hooks/usePasswordToggle";
import { ILoginCredentials } from "../../../../models/User";
import { validateLogin } from "../../../../utils/validate";
import "./LoginPass.css";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { loginAC } from "../../../../Global/auth/action";

const LoginPass: React.FC = () => {
  const dispatch = useAppDispatch();
  const {  error } = useAppSelector(
    (state) => state.authReducer
  );
 
  const initState = {
    account: "",
    password: "",
  };
  const onSubmit = async (values: ILoginCredentials) => {
    dispatch(loginAC(values));
  };

  const { formData, handleChange, handleSubmit, errors } =
    useForm<ILoginCredentials>(initState, onSubmit, validateLogin);
  const [ inputType, visible, setVisible ] = usePasswordToggle();



  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="account" className="form-label">
          Email/Phone
        </label>
        <input
          type="text"
          className="form-control"
          id="account"
          name="account"
          value={formData.account}
          onChange={handleChange}
        />
      </div>
      {errors.account && <TextErrors error={errors.account} />}

      <div className="form-group mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div className="password">
          <input
            type={inputType}
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
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
      {error && <TextErrors error={error.message} />}
      <button type="submit" className="btn btn-dark w-100 mt-1">
        Login
      </button>
     
    </form>
  );
};

export default LoginPass;
