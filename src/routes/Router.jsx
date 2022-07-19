import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../component/header/Header";
import SignUpPage from "../pages/SignUpPage";
import Home from "../pages/home";
const Router = () => {
  return (
    <div>
      <Header />
      <Routes>
        {/* 페이지 추가하기 */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
};

export default Router;
