import { useState } from "react";
import { sendOtpAC, verifyOtpAC } from "../../../../Global/auth/action";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { InputChange, FormSubmit } from "../../../../utils/types";

const LoginSms = () => {
  const { phone } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const handleSmsChange = (e: InputChange) => setValue(e.target.value);
  const handleSms = (e: FormSubmit) => {
    e.preventDefault();
    if (phone) {
      dispatch(verifyOtpAC({ phone, code: value }));
    } else {
      dispatch(sendOtpAC({ phone: value }));
    }
    setValue("");
  };

  return (
    <form onSubmit={handleSms}>
      <div className="form-group">
        {phone ? (
          <label htmlFor="phone" className="form-label">
            Please enter the code we just sent you
          </label>
        ) : (
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
        )}
        <input
          type="text"
          className="form-control"
          name=""
          id=""
          value={value}
          placeholder={`${phone ? "Enter verification code" : "+994555320029"}`}
          onChange={handleSmsChange}
        />
      </div>
      <button type="submit" className="btn btn-dark w-100">
        {phone ? "Verify and Login" : "Next"}
      </button>
    </form>
  );
};

export default LoginSms;
