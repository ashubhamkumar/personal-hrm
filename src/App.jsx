import React, { lazy, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

const App = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  return <div className="text-red-500">App</div>;
};

export default App;
