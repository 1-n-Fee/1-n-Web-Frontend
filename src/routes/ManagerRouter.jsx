import React from "react";
import { Route, Routes } from "react-router-dom";
import ManagerHeader from "../component/header/ManagerHeader";
import ManagerHomePage from "../pages/manager/ManagerHomePage";
import StoreRegisterPage from "../pages/manager/StoreRegisterPage";

const ManagerRouter = () => {
  return (
    <div>
      <ManagerHeader />
      <Routes>
        <Route path="/register" element={<StoreRegisterPage />} />
        <Route path="/*" element={<ManagerHomePage />} />
      </Routes>
    </div>
  );
};

export default ManagerRouter;
