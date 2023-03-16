import { useState } from "react";
import PasswordInput from "../../../components/FormControl/PasswordInput/PasswordInput";
import TextErrors from "../../../components/TextErrors";
import { useAppSelector } from "../../../hooks/redux";
import { useForm } from "../../../hooks/useForm";
import { IUserProfile } from "../../../models/User";
import { updateUser } from "../../../services/authService";
import { InputChange } from "../../../utils/types";
import { validateUpdateUser } from "../../../utils/validate";
import NotFound from "../../NotFound/NotFound";

const UserInfo = () => {
  const { isAuth, user } = useAppSelector((state) => state.authReducer);
  const initState: IUserProfile = {
    name: "",
    account: "",
    avatar: null,
    password: "",
    cfPassword: "",
  };
  const onSubmit = (data: IUserProfile) => {
    // if (!data.avatar||!data.name) {console.log(data)}
    updateUser({ name: data?.name })
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err.response.data));
  };
  const { formData, errors, handleChange, handleSubmit } = useForm(
    initState,
    onSubmit,
    validateUpdateUser
  );

  if (!user) return <NotFound />;

  return (
    <form onSubmit={handleSubmit} className="profile_info">
      <div className="info_avatar">
        <img
          src={
            formData?.avatar
              ? URL.createObjectURL(formData.avatar)
              : user.avatar
          }
          alt="avatar"
        />

        <span>
          <i className="fas fa-camera" />
          <p>Change</p>
          <input
            type="file"
            accept="image/*"
            name="avatar"
            id="file_up"
            onChange={handleChange}
          />
        </span>
      </div>

      <div className="form-group my-3">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          defaultValue={user.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group my-3">
        <label htmlFor="account">Account</label>
        <input
          type="text"
          className="form-control"
          id="account"
          name="account"
          defaultValue={user.account}
          onChange={handleChange}
          disabled={true}
        />
      </div>

      <div className="form-group my-3">
        <label htmlFor="password">Password</label>

        <PasswordInput
          id="password"
          name="password"
          value={formData.password}
          handleChange={handleChange}
        />
      </div>

      <div className="form-group my-3">
        <label htmlFor="cf_password">Confirm Password</label>

        <PasswordInput
          id="cfPassword"
          name="cfPassword"
          value={formData.cfPassword}
          handleChange={handleChange}
        />
      </div>
      {/* {errors.avatar && <TextErrors error={errors.avatar} />} */}
      <button className="btn btn-dark w-100" type="submit">
        Update
      </button>
    </form>
  );
};

export default UserInfo;
