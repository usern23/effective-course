import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { comicsStore } from "../../store/ComicsStore";

import classes from "./Header.module.css";
import logoMarvel from "../../assets/marvelredlogo.png";

const Header = observer(() => {
  const favoritesCount = comicsStore.favorites.length;
  const { t } = useTranslation();
  
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <img src={logoMarvel} className={classes.image} alt="logo-marvel" />

        <nav className={classes.menu_container}>
          <NavLink 
            to="/comics" 
            className={({ isActive }) => `${classes.menu} ${isActive ? classes.active : ""}`}
          >
            {t('header.comics')}
          </NavLink>

          <NavLink 
            to="/favorites" 
            className={({ isActive }) => `${classes.menu} ${isActive ? classes.active : ""}`}
          >
            {t('header.favorites')} {favoritesCount > 0 && <span className={classes.badge}>{favoritesCount}</span>}
          </NavLink>
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
});

export default Header;
