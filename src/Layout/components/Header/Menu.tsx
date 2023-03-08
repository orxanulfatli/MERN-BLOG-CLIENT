import React from 'react'
import { Link } from 'react-router-dom';

const Menu = () => {
      const authLinks = [
        { lablel: "Login", path: "/login" },
        { lablel: "Refgister", path: "/register" },
      ];
  return (
    <ul className="navbar-nav ms-auto">
      {authLinks.map((link, index) => (
        <li key={index} className="nav-item">
          <Link to={link.path} className="nav-link " >
            {link.lablel}
          </Link>
        </li>
      ))}

      {/* {dropdown} */}
      <li className="nav-item dropdown">
        <span
          className="nav-link dropdown-toggle"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          id='navbarDropdown'
        >
          UserName
        </span>

        <ul className="dropdown-menu" aria-labelledby='navbarDropdown'>
          <li>
            <Link className="dropdown-item" to="/profile">
              Profile
            </Link>
          </li>

          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item" to="/logout">
              Logout
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  );
}

export default Menu