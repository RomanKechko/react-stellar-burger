import { Link, NavLink, Outlet, useMatch } from "react-router-dom";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./app-header.module.css";
import cn from "classnames";

function AppHeader() {
  const setNavStyle = ({ isActive }) => {
    return isActive
      ? cn(styles.active_link, "pb-4 pt-4 pl-5 pr-5")
      : cn(styles.link, "pb-4 pt-4 pl-5 pr-5");
  };
  const isConstructor = !!useMatch({ path: "/", exact: true });
  const isFeed = !!useMatch("/lenta");
  const isProfile = !!useMatch("/profile");

  return (
    <>
      <header className={cn(styles.header, "pb-4 pt-4")}>
        <nav className={styles.nav}>
          <div className={styles.link__column_left}>
            <NavLink to="/" className={setNavStyle}>
              <BurgerIcon type={isConstructor ? "primary" : "secondary"} />
              <p className="text text_type_main-default">Конструктор</p>
            </NavLink>

            <NavLink to="/lenta" className={setNavStyle}>
              <ListIcon type={isFeed ? "primary" : "secondary"} />
              <p className="text text_type_main-default">Лента заказов</p>
            </NavLink>
          </div>
          <Logo />
          <div className={styles.link__column_right}>
            <NavLink to="/profile" className={setNavStyle}>
              <ProfileIcon type={isProfile ? "primary" : "secondary"} />
              <p className="text text_type_main-default">Личный кабинет</p>
            </NavLink>
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
export default AppHeader;
