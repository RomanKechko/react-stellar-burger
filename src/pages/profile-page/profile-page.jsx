import React from "react";
import {
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, NavLink } from "react-router-dom";
import styles from "./profile-page.module.css";
import cn from "classnames";
import { isAction } from "@reduxjs/toolkit";

const ProfilePage = () => {
  const [email, setEmail] = React.useState("bob@example.com");
  const [password, setPassword] = React.useState("123456789");
  const [name, setName] = React.useState("Рома");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const setNavStyle = ({ isActive }) => {
    return isActive
      ? cn(styles.activelink, "text text_type_main-medium")
      : cn(styles.link, "text text_type_main-medium");
  };

  return (
    <div className={styles.page}>
      <div className={styles.navigate}>
        <nav className={styles.links}>
          <NavLink to="/profile" className={setNavStyle}>
            Профиль
          </NavLink>

          <NavLink to="/profile/orders" className={setNavStyle}>
            История заказов
          </NavLink>
          <NavLink to="/exit" className={setNavStyle}>
            Выход
          </NavLink>
        </nav>
        <p className={cn(styles.text, "text text_type_main-default mt-20")}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div>
        <div className={cn(styles.container)}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => setName(e.target.value)}
            value={name}
            name={"name"}
            icon="EditIcon"
          />
          <EmailInput
            onChange={handleEmailChange}
            value={email}
            name={"email"}
            placeholder="Логин"
            isIcon={true}
            extraClass="mb-2"
          />

          <PasswordInput
            onChange={handlePasswordChange}
            value={password}
            name={"password"}
            icon="EditIcon"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
