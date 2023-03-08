import React, { useState } from "react";
import "./RegisterForm.css";
import { usePasswordToggle } from "../../../hooks/usePasswordToggle";
import { useForm } from "../../../hooks/useForm";
import { IRegisterCredentials } from "../../../models/User";
import { validateRegister } from "../../../utils/validate";
import TextErrors from "../../../components/TextErrors";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { registerAC } from "../../../Global/auth/action";

const RegisterForm = () => {
  const dispatch = useAppDispatch()
  const {error,message} = useAppSelector(state=>state.authReducer)
  const [inputType, visible, setVisible] = usePasswordToggle();
  const [inputcfType, cfvisible, setCfVisible] = usePasswordToggle();
  const initalState = { name: "", account: "", password: "", cfPassword: "" };
  const onSubmit = (data: IRegisterCredentials) => {
    dispatch(registerAC(data))
  };
  const { formData, handleChange, handleSubmit, errors } = useForm(
    initalState,
    onSubmit,
    validateRegister
  );
  if (message) return <div>{message}</div>
  return (
    <form onSubmit={handleSubmit} className="register">
      <div className="form-group mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>

        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name is up to 20 chars."
        />
        {errors.name && <TextErrors error={errors.name} />}
      </div>

      <div className="form-group mb-3">
        <label htmlFor="account" className="form-label">
          Email / Phone number
        </label>

        <input
          type="text"
          className="form-control"
          id="account"
          name="account"
          value={formData.account}
          onChange={handleChange}
          placeholder="Example@gmail.com/+84374481936"
        />
        {errors.account && <TextErrors error={errors.account} />}
      </div>

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
            placeholder="Password must be at least 6 chars."
          />

          <span className="password-togle-icon">
            <i
              onClick={() => setVisible(!visible)}
              className={`bi ${visible ? "bi-eye" : "bi-eye-slash"}`}
            ></i>
          </span>
          {errors.password && <TextErrors error={errors.password} />}
        </div>
      </div>

      <div className="form-group mb-3">
        <label htmlFor="password" className="form-label">
          Confirm Password
        </label>

        <div className="password">
          <input
            type={inputcfType}
            className="form-control"
            id="cfPassword"
            name="cfPassword"
            value={formData.cfPassword}
            onChange={handleChange}
            placeholder="Your confirm password."
          />
          <span className="password-togle-icon">
            <i
              onClick={() => setCfVisible(!cfvisible)}
              className={`bi ${cfvisible ? "bi-eye" : "bi-eye-slash"}`}
            ></i>
          </span>
          {errors.cfPassword && <TextErrors error={errors.cfPassword} />}
        </div>
      </div>
      {error && <TextErrors error={error.message} />}
      <button type="submit" className="btn btn-dark w-100 my-1">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
