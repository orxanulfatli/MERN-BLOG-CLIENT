import React, { useEffect } from "react";
import { userSlice } from "./Global/reducers.ts/UserSlice";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { getUsers } from "./Global/reducers.ts/actions";
import Header from "./Layout/components/Header/Header";
import Footer from "./Layout/components/Footer";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Home from "./Pages/Home";
import Login from "./Pages/Login/Login";

function App() {
  const { users, isLoading, error } = useAppSelector(
    (state) => state.userReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index={true} element={<Home />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
