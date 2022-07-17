import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../component/Header/Header";
import SignUpPage from "../pages/SignUpPage";

const Router = () => {
  return (
    <div>
      <Header />
      <Routes>
        {/* 페이지 추가하기 */}
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
};

export default Router;
