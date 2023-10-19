import React from "react";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./register-page.module.css";
import cn from "classnames";

const RegisterPage = () => {
  const [email, setEmail] = React.useState("bob@example.com");
  const [password, setPassword] = React.useState("123456789");
  const [name, setName] = React.useState("Рома");
  const inputRef = React.useRef(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className={styles.page}>
      <h2 className="text text_type_main-medium">Регистрация</h2>
      <div className={cn(styles.container, "mt-6 mb-6")}>
        <Input
          type={"text"}
          placeholder={"Ваше имя "}
          onChange={(e) => setName(e.target.value)}
          value={name}
          name={"name"}
          error={false}
          ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
        />
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
        Зарегистрироваться
      </Button>

      <p className={cn(styles.text, "text text_type_main-default pt-20")}>
        Уже зарегестрированы?{" "}
        <Link
          to="/login"
          className={cn(styles.link, "text text_type_main-default")}
        >
          Войти
        </Link>{" "}
      </p>
    </div>
  );
};

export default RegisterPage;
