import { Link } from "react-router-dom";
import './Header.css'
import Menu from "./Menu";
import Search from "./Search";

//  style={{ backgroundColor: "#ECF2FF" }}
const Header = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light p-3"
    >
      <Link to="/" className="navbar-brand">
        BlogDev
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <Search />
        <Menu />
      </div>
    </nav>
  );
};

export default Header;
