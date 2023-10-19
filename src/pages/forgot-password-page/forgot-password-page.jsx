import React from "react";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./forgot-password-page.module.css";
import cn from "classnames";

const ForgotPasswordPage = () => {
  const [email, setEmail] = React.useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className={styles.page}>
      <h2 className="text text_type_main-medium"> Восстановление пароля</h2>
      <div className={cn(styles.container, "mt-6 mb-6")}>
        <EmailInput
          onChange={handleEmailChange}
          placeholder="Укажите E-mail"
          value={email}
          name={"email"}
          isIcon={false}
        />
      </div>
      <Button htmlType="button" type="primary" size="large">
        Восстановить
      </Button>

      <p className={cn(styles.text, "text text_type_main-default pt-20")}>
        Вспонили пароль?{" "}
        <Link
          to="/login"
          className={cn(styles.link, "text text_type_main-default")}
        >
          Войти
        </Link>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;
