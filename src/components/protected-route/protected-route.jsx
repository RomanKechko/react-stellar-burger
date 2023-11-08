import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import styles from "./protected-route.module.css";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ onlyUnAuth, children }) => {
  const location = useLocation();
  const currentUser = useSelector((state) => state.user.data);
  const isAuthCheck = useSelector((state) => state.user.isAuthCheck);

  if (!isAuthCheck) {
    return <span className={styles.loader}></span>;
  }

  if (onlyUnAuth && currentUser) {
    const from = location.state?.from || { pathname: "/" };

    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !currentUser) {
    return <Navigate to={{ pathname: "/login" }} state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
