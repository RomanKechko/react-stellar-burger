import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./register-page.module.css";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { registerUserRequest } from "../../services/user/user-slice";
import { IUserLogging } from "../../types/interface";

const RegisterPage: FC = () => {
  const [user, setUserData] = useState<IUserLogging>({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, password, email } = user;
    if (!name || !password || !email) {
      return;
    }
    //@ts-ignore
    dispatch(registerUserRequest({ name, password, email }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserData({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className={styles.page}>
      <h2 className="text text_type_main-medium">Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div className={cn(styles.container, "mt-6 mb-6")}>
          <Input
            type={"text"}
            placeholder={"Ваше имя"}
            onChange={handleChange}
            defaultValue={""}
            value={user.userName}
            name={"name"}
          />

          <EmailInput
            onChange={handleChange}
            defaultValue={""}
            value={user.email}
            name={"email"}
          />
          <PasswordInput
            onChange={handleChange}
            defaultValue={""}
            value={user.password}
            name={"password"}
            extraClass="mb-2"
          />
        </div>
        <Button htmlType="submit" type="primary" size="large">
          Зарегистрироваться
        </Button>
      </form>
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
