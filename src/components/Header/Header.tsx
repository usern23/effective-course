import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import logoMarvel from "../../assets/marvelredlogo.png";

function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <img src={logoMarvel} className={classes.image} alt="logo-marvel" />

        <nav className={classes.menu_container}>
          <NavLink 
            to="/comics" 
            className={({ isActive }) => `${classes.menu} ${isActive ? classes.active : ""}`}
          >
            Comics
          </NavLink>

          <NavLink 
            to="/favorites" 
            className={({ isActive }) => `${classes.menu} ${isActive ? classes.active : ""}`}
          >
            Favorites
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
