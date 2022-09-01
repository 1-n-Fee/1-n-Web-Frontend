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

import OauthGoogle from "../pages/oauthGoogle";
import OauthKakao from "../pages/oauthKakao";
import OauthNaver from "../pages/oauthNaver";

import OwnerSignupPage from "../pages/OwnerSignupPage";
import HistoryPage from "../pages/HistoryPage";
import BeforeSignUpPage from "../pages/BeforeSignUpPage";
import CreateRoom from "../pages/createRoom";
import ManagerHomePage from "../pages/manager/ManagerHomePage";
import StoreRegisterPage from "../pages/manager/StoreRegisterPage";

const Router = () => {
  return (
    <div>
      <Header />
      <Routes>
        {/* 페이지 추가하기 */}
        <Route path="/before-signup" element={<BeforeSignUpPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signup/oauth/:site" element={<SignUpPage />} />
        <Route path="/chat/:roomId" element={<ChatPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<UserInfo />} />
        <Route path="/user/nickname" element={<NNameChange />} />
        <Route path="/user/pw" element={<PwChange />} />
        <Route path="/find/id" element={<FindIdPage />} />
        <Route path="/find/pw" element={<FindPwPage />} />

        <Route path="/auth/kakao" element={<OauthKakao />} />
        <Route path="/auth/naver" element={<OauthNaver />} />
        <Route path="/auth/google" element={<OauthGoogle />} />

        <Route path="/creating-room" element={<CreateRoom />} />
        <Route path="/signup/owner" element={<OwnerSignupPage />} />
        <Route path="/history" element={<HistoryPage />} />

        <Route path="/manager/register" element={<StoreRegisterPage />} />
        <Route path="/manager/*" element={<ManagerHomePage />} />

        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default Router;
