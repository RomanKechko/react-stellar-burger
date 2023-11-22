import React, { FC } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./profile-page.module.css";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { logoutUserRequest } from "../../services/user/user-slice";

const ProfilePage: FC = () => {
  const dispatch = useDispatch();
  const logoutUser = () => {
   /*  console.log("Form submitted!"); */
    dispatch(logoutUserRequest());
  };
  const setNavStyle = ({ isActive }: { isActive: boolean }) => {
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
          <p
            onClick={logoutUser}
            className={cn(styles.link, "text text_type_main-medium")}
          >
            Выход
          </p>
        </nav>
        <p className={cn(styles.text, "text text_type_main-default mt-20")}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePage;
