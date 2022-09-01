import React from "react";
import SideBar from "../component/home/sideBar";
import Map from "../component/home/map";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { locData } from "../locData";
import postIdAtom from "../recoil/meal/atom";
import { useSetRecoilState } from "recoil";
const Home = (props) => {
  const [meals, setMeals] = useState([]);
  const [mealListEntry, setMealListEntry] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState({});
  const setPostId = useSetRecoilState(postIdAtom);
  const fetchMeal = async (postId) => {
    const auth = localStorage.getItem("Authorization");
    await axios
      .get(`http://localhost:8080/post/${postId}`, {
        headers: {
          Authorization: auth,
        },
      })
      .then((res) => {
        setSelectedMeal(res.data);
        console.log("fetchMeal");
        console.log(selectedMeal);
      })
      .catch((e) => console.log(e));
  };
  const onMealClick = (postId) => {
    setPostId(postId);
    fetchMeal(postId);
  };
  const navigate = useNavigate();
  //const [selectedMarker, setSelectedMarker] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openId, setOpenId] = useState("");
  const closeAll = () => {
    setIsOpen(false);
    setIsDetailOpen(false);
  };
  const toggleSidebar = () => {
    isOpen ? closeAll() : setIsOpen(true);
  };
  const fetchBySpotId = async (id) => {
    console.log(`fetch spot id`);
    const auth = localStorage.getItem("Authorization");
    await axios
      .get(`http://localhost:8080/post/spot/${id}`, {
        headers: {
          Authorization: auth,
        },
      })
      .then((res) => {
        console.log(`fetch spot ${id}`);
        console.log(res);
        console.log(res.data);
        setMealListEntry(res.data);
        console.log(mealListEntry);
      })
      .catch((e) => {
        const errorKey = e.response.data.errorCode;
        switch (errorKey) {
          case "T001":
            alert("로그인을 먼저 진행하세요");
            navigate("/login");
            break;
          default:
            console.log(`에러처리 필요: ${errorKey}`);
            alert("예상하지 못한 에러가 발생했습니다");
        }
      });
  };
  const findEntry = (id) => {
    //const entry = { ...meals[id] };
    setOpenId(id);
    setIsOpen(true);
    fetchBySpotId(id);
    //meals[id] ? setMealListEntry(meals[id]) : setMealListEntry(null);
    //setMealListEntry(meals[id]);
    //setIsDetailOpen(false);
  };

  return (
    <HomeWrapper>
      <SideBar
        meals={mealListEntry}
        onMealClick={onMealClick}
        selectedMeal={selectedMeal}
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
        id={openId}
        isOpen={isOpen}
        toggle={toggleSidebar}
      />
      <Map
        markers={locData}
        //setSelectedMarker={setSelectedMarker}
        onMarkerClick={findEntry}
      />
    </HomeWrapper>
  );
};

export default Home;

const HomeWrapper = styled.div`
  box-sizing: border-box;
  margin: 0;
`;
