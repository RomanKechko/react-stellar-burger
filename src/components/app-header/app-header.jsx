import { NavLink, Outlet } from "react-router-dom";
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
  return (
    <>
      <header className={cn(styles.header, "pb-4 pt-4")}>
        <nav className={styles.nav}>
          <div className={styles.link__column_left}>
            <a href="#" className={cn(styles.link, "pb-4 pt-4 pl-5 pr-5")}>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default">Конструктор</p>
            </a>
            <a href="#" className={cn(styles.link, "pb-4 pt-4 pl-5 pr-5")}>
              <ListIcon type="primary" />
              <p className="text text_type_main-default">Лента заказов</p>
            </a>
          </div>
          <Logo />
          <div className={styles.link__column_right}>
            <a href="#" className={cn(styles.link, "pb-4 pt-4 pl-5 pr-5")}>
              <ProfileIcon type="primary" />
              <p className="text text_type_main-default">Личный кабинет</p>
            </a>
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
export default AppHeader;
