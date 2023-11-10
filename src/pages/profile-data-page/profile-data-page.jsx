import React, { useState } from "react";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./profile-data-page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { dataСhangeRequest } from "../../services/user/user-slice";

const ProfileDataPage = () => {
  const [newData, setNewData] = useState({});
  console.log(newData);

  const dispatch = useDispatch();

  const existingName = useSelector((state) => state.user.data.name);
  const existingEmail = useSelector((state) => state.user.data.email);

  const handleDataChange = (e) => {
    e.preventDefault();

    console.log("Form submitted!");
    const { name, email } = newData;
    if (name === existingName || email === existingEmail) {
      return;
    }
    dispatch(dataСhangeRequest({ email, name }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData({
      ...newData,
      [name]: value,
    });
  };

  return (
    <div>
      <form onSubmit={handleDataChange} className={style.container}>
        <Input
          onChange={handleChange}
          type={"text"}
          placeholder={"Имя"}
          defaultValue={existingName}
          name={"name"}
          icon="EditIcon"
        />
        <EmailInput
          onChange={handleChange}
          defaultValue={existingEmail}
          name={"email"}
          placeholder="Логин"
          isIcon={true}
          extraClass="mb-2"
        />
        <PasswordInput
          onChange={handleChange}
          defaultValue={"Введите новый пароль"}
          name={"password"}
          icon="EditIcon"
        />
        <div className={style.buttons}>
          <Button htmlType="reset" type="secondary" size="large">
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="large">
            Сохранить
          </Button>
        </div>{" "}
      </form>
    </div>
  );
};

export default ProfileDataPage;
