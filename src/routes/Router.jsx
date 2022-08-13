import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../component/header/Header";
import ChatPage from "../pages/chat/ChatPage";
import SignUpPage from "../pages/SignUpPage";
import Home from "../pages/home";
import LoginPage from "../pages/loginPage";

import PwChange from "../pages/pwChange";
import NNameChange from "../pages/nNameChange";
import UserInfo from "../pages/userInfo";

import FindIdPage from "../pages/findIdPage";
import FindPwPage from "../pages/findPwPage";
import OwnerSignupPage from "../pages/OwnerSignupPage";
import HistoryPage from "../pages/HistoryPage";
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

        <Route path="/user" element={<UserInfo />} />
        <Route path="/user/nickname" element={<NNameChange />} />
        <Route path="/user/pw" element={<PwChange />} />

        <Route path="/find/id" element={<FindIdPage />} />
        <Route path="/find/pw" element={<FindPwPage />} />

        <Route path="/signup/owner" element={<OwnerSignupPage />} />
        <Route path="/history" element={<HistoryPage />} />

      </Routes>
    </div>
  );
};

export default Router;
