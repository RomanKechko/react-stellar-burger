import React from "react";
import { Route, Routes } from "react-router-dom";

import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import MainPage from "../../pages/main-page/main-page";
import LoginPage from "../../pages/login-page/login-page";

function App() {
  return (
    <div className={style.page}>
      <Routes>
        <Route path="/" element={<AppHeader />}>
          <Route index element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register " element={<MainPage />} />
          <Route path="/forgot-password" element={<MainPage />} />
          <Route path="/reset-password" element={<MainPage />} />
          <Route path="/profile " element={<MainPage />} />
          <Route path="/ingredients/:id" element={<MainPage />} />
          <Route path="*" element={<MainPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
