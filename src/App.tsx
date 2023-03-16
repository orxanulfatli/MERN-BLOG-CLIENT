import { Route, Routes } from "react-router-dom";
import {Alert} from "./components/alert/Alert";
import PersistLogin from "./components/PersistLogin";
import MainLayout from "./Layout/MainLayout";
import Active from "./Pages/Active/Active";
import Home from "./Pages/Home";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import Profile from "./Pages/Profile/Profile";
import Register from "./Pages/Register/Register";
import PublicRoute from "./routes/PublicRoute";



function App() {

  return (
    <div className="container">
      <Alert />

      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<MainLayout />}>
            <Route index={true} element={<Home />} />

            <Route element={<PublicRoute restricted={true} />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          
            <Route path="active/:activeToken" element={<Active />} />
            <Route path="profile/:id" element={<Profile />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
