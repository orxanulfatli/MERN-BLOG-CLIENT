import React, { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

interface IPublicRoute {
  restricted?: boolean;
}

const PublicRoute: FC<IPublicRoute> = ({ restricted }) => {
  const { isAuth } = useAppSelector((state) => state.authReducer);
  const location = useLocation();
  return isAuth && restricted ? (
    <Navigate to="/" replace={true}  />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
