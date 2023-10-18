import React from "react";
import {
  EmailInput,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

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
    <div className="">
      <h2>Вход</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <EmailInput
          onChange={handleEmailChange}
          value={email}
          name={"email"}
          placeholder="Логин"
          isIcon={true}
          extraClass="mb-2"
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
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
      <p>
        Вы — новый пользователь? <Link>Зарегистрироваться</Link>
      </p>
      <p>
        Забыли пароль? <Link>Зарегистрироваться</Link>
      </p>
    </div>
  );
};

export default LoginPage;
