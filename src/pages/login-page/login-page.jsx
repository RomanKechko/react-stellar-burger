import React, { useState } from "react";
import {
  EmailInput,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./login-page.module.css";
import cn from "classnames";
import { authUserRequest } from "../../services/user/user-slice";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted!");
    const { email, password } = userData;
    if (!email || !password) {
      return;
    }
    dispatch(authUserRequest({ email, password }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  return (
    <div className={styles.page}>
      <h2 className="text text_type_main-medium">Вход</h2>
      <form onSubmit={handleSubmit}>
        <div className={cn(styles.container, "mt-6 mb-6")}>
          <EmailInput
            onChange={handleChange}
            defaultValue={""}
            value={userData.email}
            name={"email"}
            isIcon={false}
          />

          <PasswordInput
            onChange={handleChange}
            defaultValue={""}
            value={userData.password}
            name={"password"}
            extraClass="mb-2"
          />
        </div>
        <Button htmlType="submit" type="primary" size="large">
          Войти
        </Button>
      </form>
      <p className={cn(styles.text, "text text_type_main-default pt-20")}>
        Вы — новый пользователь?{" "}
        <Link
          to="/register"
          className={cn(styles.link, "text text_type_main-default")}
        >
          Зарегистрироваться
        </Link>
      </p>
      <p className={cn(styles.text, "text text_type_main-default pt-4")}>
        Забыли пароль?{" "}
        <Link
          to="/forgot-password"
          className={cn(styles.link, "text text_type_main-default")}
        >
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
