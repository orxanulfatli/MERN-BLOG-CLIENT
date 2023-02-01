import React from "react";
import { useForm } from "../../hooks/useForm";
import LoginForm from "./components/LoginForm";
import "./Login.css";
import { validateLogin } from "../../utils/validate";
import { LoginFormInitData } from "../../models/LoginTypes";
import { Link } from "react-router-dom";
import { ApiError } from './../../../../server/src/utils/apiErrors';

const Login: React.FC = () => {
  const initState = {
    account: "",
    password: "",
  };
  const onSubmit = (data: LoginFormInitData) => {
    console.log(data);
  };
  const { formData, handleInputChange, handleSubmit, errors } =
    useForm<LoginFormInitData>(initState, onSubmit, validateLogin);
  const [sms, setSms] = React.useState(false);

  return (
    <div className="login">
      <div className="login_box">
        <h3 className="text-uppercase text-center mb-4">Login</h3>
        <LoginForm
          value={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          errors={errors}
        />
        <small className="row my-2 text-primary" style={{ cursor: "pointer" }}>
          <span className="col-6">
            <Link to="/forgot_password"> Forgot password?</Link>
          </span>

          <span className="col-6 text-end " onClick={() => setSms(!sms)}>
            {sms ? "Sign in with password" : "Sign in with sms"}
          </span>
        </small>

        <p>
          You don't have an account?
          <Link to='/register' style ={{color:'crimson'}}>Register now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
