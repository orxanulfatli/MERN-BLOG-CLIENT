import { Link, useLocation } from "react-router-dom";
import { logoutAC } from "../../../Global/auth/action";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

const Menu = () => {
  const { isAuth, user } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch()
  const {pathname} = useLocation()

  const publicLinks = [
    { label: "Login", path: "/login" },
    { label: "Refgister", path: "/register" },
  ];
  const protectedLinks = [
    { label: "Home", path: "/" },
    { label: "CreateBlog", path: "/create_blog" },
  ];
  const navLinks = isAuth ? protectedLinks : publicLinks;
    const isActive = (pn: string) => {
      if (pn === pathname) return "active";
    };
  const handleLogout = () => {
     dispatch(logoutAC())
  }
  return (
    <ul className="navbar-nav ms-auto">
      {navLinks.map((link, index) => (
        <li key={index} className={`nav-item ${isActive(link.path)}`}>
          <Link to={link.path} className="nav-link ">
            {link.label}
          </Link>
        </li>
      ))}
      {user?.role === "admin" && (
        <li className={`nav-item ${isActive("/category")}`}>
          <Link to="/category" className="nav-link">
            Category
          </Link>
        </li>
      )}
      {/* {dropdown} */}
      {user && (
        <li className="nav-item dropdown ">
          <span
            className="nav-link dropdown-toggle"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            id="navbarDropdown"
          >
            <img src={user.avatar} alt="#" className="avatar" />
          </span>

          <ul
            className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start"
            aria-labelledby="navbarDropdown"
            style={{ minWidth: "8rem" }}
          >
            <li>
              <Link className="dropdown-item" to={`/profile/${user?._id}`}>
                Profile
              </Link>
            </li>

            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item" to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </li>
      )}
    </ul>
  );
};

export default Menu;
