import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import styles from "./protected-route.module.css";

const ProtectedRoute = ({ onlyUnAuth, user, children }) => {
  const location = useLocation();

  if (!user?.isAuthCheck) {
    return <span className={styles.loader}></span>;
  }

  if (onlyUnAuth && user?.user?.email) {
    const from = location.state?.from || { pathname: "/profile" };
    /*  console.log(from); */
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user?.user?.email) {
    return <Navigate to={{ pathname: "/login" }} state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
