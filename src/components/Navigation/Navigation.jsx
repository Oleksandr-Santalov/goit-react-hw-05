import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const Navigation = () => {
  return (
    <header className={css.header}>
      <nav>
        <ul className={css.list}>
          <li className={css.item}>
            <NavLink className={css.link} to="/">
              Home
            </NavLink>
          </li>
          <li className={css.item}>
            <NavLink className={css.link} to="/movies">
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
