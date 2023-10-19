import React from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./reset-password-page.module.css";
import cn from "classnames";

const ResetPassworPage = () => {
  const [password, setPassword] = React.useState("");
  const [code, setСode] = React.useState("");
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className={styles.page}>
      <h2 className="text text_type_main-medium">Регистрация</h2>
      <div className={cn(styles.container, "mt-6 mb-6")}>
        <PasswordInput
          onChange={handlePasswordChange}
          placeholder={"Введите новый пароль"}
          value={password}
          name={"password"}
          extraClass="mb-2"
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={(e) => setСode(e.target.value)}
          value={code}
          name={"name"}
          error={false}
          ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
        />
      </div>
      <Button htmlType="button" type="primary" size="large">
        Сохранить
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

export default ResetPassworPage;
