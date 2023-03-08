import React from "react";
import LoginPass from "./components/LoginPass/LoginPass";
import "./Login.css";
import { Link } from "react-router-dom";
import LoginSms from "./components/LoginSms/LoginSms";

const Login: React.FC = () => {
  const [sms, setSms] = React.useState(false);


  return (
    <div className="login">
      <div className="login_box">
        <h3 className="text-uppercase text-center mb-4">Login</h3>
        {sms ? <LoginSms /> : <LoginPass />}
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
          <Link to="/register" style={{ color: "crimson" }}>
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
