import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Alert } from "./components/alert/Alert";
import PersistLogin from "./components/PersistLogin";
import { getHomeBlogsAC } from "./Global/blog/action";
import { getCategoriesAC } from "./Global/category/action";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import MainLayout from "./Layout/MainLayout";
import Active from "./Pages/Active/Active";
import BlogsByCategory from "./Pages/BlogsByCategory/BlogsByCategory";
import Category from "./Pages/Category/Category";
import CreateBlog from "./Pages/CreateBlog/CreateBlog";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import Profile from "./Pages/Profile/Profile";
import Register from "./Pages/Register/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Blog from "./Pages/Blog/Blog";

//socket 
import io from 'socket.io-client';
import { socketAC } from "./Global/socket/socket";
import SocketClient from "./SocketClient";
import { apiUrl } from "./services/constants";

function App() {
  const dispatch = useAppDispatch();
  const { newBlog } = useAppSelector(state => state.blogReducer)
console.log('hello')
  useEffect(() => {
    dispatch(getCategoriesAC());
  console.log(apiUrl,'url')
  }, []);

  useEffect(() => {
      const socket = io(apiUrl as string);
      dispatch(socketAC.socket(socket))
    return () => { socket.close() }
  }, [dispatch,apiUrl]);
 

  return (
    <div className="container">
      <Alert />
  <SocketClient/>
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
            <Route element={<ProtectedRoute permission={["admin"]} />}>
              <Route path="category" element={<Category />} />
            </Route>
            <Route element={<ProtectedRoute permission={["admin", "user"]} />}>
              <Route path="create_blog" element={<CreateBlog />} />
            </Route>
            <Route path="blogs/:id" element={<BlogsByCategory />} />
            <Route path = "blog/:id" element = {<Blog/> } />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
