import React from "react";
import {
  EmailInput,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./login-page.module.css";
import cn from "classnames";

const LoginPage = () => {
  const [email, setEmail] = React.useState("bob@example.com");
  const [password, setPassword] = React.useState("123456789");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className={styles.page}>
      <h2 className="text text_type_main-medium">Вход</h2>
      <div className={cn(styles.container, "mt-6 mb-6")}>
        <EmailInput
          onChange={handleEmailChange}
          value={email}
          name={"email"}
          isIcon={false}
        />

        <PasswordInput
          onChange={handlePasswordChange}
          value={password}
          name={"password"}
          extraClass="mb-2"
        />
      </div>
      <Button htmlType="button" type="primary" size="large">
        Войти
      </Button>

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
