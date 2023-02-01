import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header/Header'

const MainLayout = () => {
  return (
    <div className=" min-vh-100 d-flex flex-column justify-content-between">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout