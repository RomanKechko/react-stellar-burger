import React, { useEffect } from "react";
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

import ProtectedRoute from "../protected-route/protected-route";

import { currentUserRequest } from "../../services/user/user-slice";
import ProfileDataPage from "../../pages/profile-data-page/profile-data-page";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);
  useEffect(() => {
    dispatch(currentUserRequest());
  }, []);

  const backgroundLocation = location.state?.backgroundLocation;
  const onCloseModal = () => {
    navigate(backgroundLocation.pathname || "/", { replace: true });
  };

  return (
    <div className={style.page}>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<AppHeader />}>
          <Route index element={<MainPage />} />

          <Route
            path="/login"
            element={
              <ProtectedRoute onlyUnAuth>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute onlyUnAuth>
                <RegisterPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRoute onlyUnAuth>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRoute onlyUnAuth>
                <ResetPassworPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfileDataPage />} />
          </Route>

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
