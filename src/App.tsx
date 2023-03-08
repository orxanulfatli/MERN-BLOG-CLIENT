import { Route, Routes } from "react-router-dom";
import Alert from "./components/alert/Alert";
import MainLayout from "./Layout/MainLayout";
import Home from "./Pages/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

function App() {
  return (
    <div className="container">
      <Alert />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index={true} element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
