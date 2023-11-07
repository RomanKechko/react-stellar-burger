import React, { useEffect, useLayoutEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import MainPage from "../../pages/main-page/main-page";
import LoginPage from "../../pages/login-page/login-page";
import RegisterPage from "../../pages/register-page/register-page";
import ForgotPassword from "../../pages/forgot-password-page/forgot-password-page";
import ResetPassworPage from "../../pages/reset-password-page/reset-password-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import ErrorPage from "../../pages/error-page/error-page";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../services/ingredints/ingredients-slice";
import * as apiAuth from "../../utils/ApiAuth";
import ProtectedRoute from "../protected-route/protected-route";
import { getToken } from "../../utils/token";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  console.log(currentUser);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const navigate = useNavigate();

  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  const onCloseModal = () => {
    navigate(backgroundLocation.pathname || "/", { replace: true });
  };
  const token = getToken();

  useEffect(() => {
    apiAuth
      .getContent(token)
      .then((dataUser) => {
        if (dataUser.user.email) {
          setCurrentUser({ ...dataUser, isAuthCheck: true });
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setCurrentUser((prevState) => ({ ...prevState, isAuthCheck: true }));
      });
  }, [token]);

  const cbLogin = (dataLogin) => {
    apiAuth.authorize(dataLogin).then((dataUser) => {
      setCurrentUser(dataUser.email);
      console.log("login", dataUser);
    });
  };
  const cbRegister = (dataRegister) => {
    apiAuth.register(dataRegister).then((dataUser) => {
      setCurrentUser(dataUser.user);
      console.log("register", dataUser);
    });
  };

  return (
    <div className={style.page}>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<AppHeader />}>
          <Route index element={<MainPage />} />

          <Route
            path="/login"
            element={
              <ProtectedRoute user={currentUser} onlyUnAuth loading>
                <LoginPage onLogin={cbLogin} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute user={currentUser} onlyUnAuth loading>
                <RegisterPage onRegister={cbRegister} />
              </ProtectedRoute>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassworPage />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute user={currentUser}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route path="/ingredients/:id" element={<IngredientDetails />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onCloseModal={onCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
