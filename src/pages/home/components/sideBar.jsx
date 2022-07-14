import React, { useState } from "react";
//import { useEffect } from "react";
//import MealDetail from "./meal_detail";
import MealList from "./meal_list";
//import styles from "./sideBar.module.css";

const SideBar = ({
  meals,
  onMealClick,
  selectedMeal,
  isDetailOpen,
  setIsDetailOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  //const [isDetailOpen, setIsDetailOpen] = useState(false);
  const ToggleSidebar = () => {
    isOpen === true ? setIsOpen(false) : setIsOpen(true);
  };
  const ToggleDetailBar = () => {
    isDetailOpen === true ? setIsDetailOpen(false) : setIsDetailOpen(true);
  };
  return (
    <>
      <div className="container-fluid mt-3">
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-md">
          <div className="container-fluid p-2">
            <span className="navbar-brand">Company Logo</span>
            <div className="form-inline ml-auto">
              <div className="btn btn-primary" onClick={ToggleSidebar}>
                <span>CLICK</span>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className={`sidebar ${isOpen === true ? "active" : ""}`}>
        <div className="sd-header">
          <div className="btn btn-primary" onClick={ToggleSidebar}>
            <span>CLICK</span>
          </div>
        </div>
        <MealList
          meals={meals}
          isDetailOpen={isDetailOpen}
          setIsDetailOpen={setIsDetailOpen}
          ToggleDetailBar={ToggleDetailBar}
          onMealClick={onMealClick}
          selectedMeal={selectedMeal}
        />
      </div>
    </>
  );
};
export default SideBar;
