import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./profile-data-page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { dataСhangeRequest } from "../../services/user/user-slice";
import { profileEmail, profileName } from "../../services/user/user-selector";
import { IUserLogging } from "../../types/interface";

const ProfileDataPage: FC = () => {
  const [newData, setNewData] = useState<IUserLogging>({
    name: "",
    email: "",
    password: "",
  });

  console.log(newData);
  const dispatch = useDispatch();

  const existingName = useSelector(profileName);
  const existingEmail = useSelector(profileEmail);
  /*  */
  const handleDataChange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Form submitted!");
    const { name, email } = newData;
    if (name === existingName.name && email === existingEmail.email) {
      return;
    }
    //@ts-ignore
    dispatch(dataСhangeRequest({ email, name }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewData({
      ...newData,
      [name]: value,
    });
  };

  useEffect(() => {
    setNewData({
      ...newData,
      name: existingName.name,
      email: existingEmail.email,
      password: "",
    });
  }, [existingName, existingEmail]);

  return (
    <div>
      <form onSubmit={handleDataChange} className={style.container}>
        <Input
          onChange={handleChange}
          type={"text"}
          placeholder={"Имя"}
          value={newData.name}
          name={"name"}
          icon="EditIcon"
        />
        <EmailInput
          onChange={handleChange}
          value={newData.email}
          name={"email"}
          placeholder="Логин"
          isIcon={true}
          extraClass="mb-2"
        />
        <PasswordInput
          onChange={handleChange}
          value={"Введите новый пароль"}
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
