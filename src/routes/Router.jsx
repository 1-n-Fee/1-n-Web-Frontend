import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../component/header/Header";
import ChatPage from "../pages/chat/ChatPage";
import SignUpPage from "../pages/SignUpPage";
import Home from "../pages/home";
import LoginPage from "../pages/loginPage";
import UserInfoAccordion from "../component/userInfo/userInfoAccordion";
const Router = () => {
  return (
    <div>
      <Header />
      <Routes>
        {/* 페이지 추가하기 */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<UserInfoAccordion />} />
      </Routes>
    </div>
  );
};

export default Router;
