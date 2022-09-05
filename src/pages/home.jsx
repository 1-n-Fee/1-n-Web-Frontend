import React from "react";
import SideBar from "../component/home/sideBar";
import Map from "../component/home/map";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { locData } from "../locData";
import {
  detailOpenAtom,
  mealListEntryAtom,
  openAtom,
  openIdAtom,
  originalMealListEntryAtom,
  postIdAtom,
  selectedMealAtom,
} from "../recoil/meal/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import proposalPopupAtom from "../recoil/proposalPopupData/atom";
import Proposal from "../component/home/proposal";
const Home = () => {
  const navigate = useNavigate();

  const [mealListEntry, setMealListEntry] = useRecoilState(mealListEntryAtom);
  const [selectedMeal, setSelectedMeal] = useRecoilState(selectedMealAtom);
  const [proposalData, setProposalData] = useRecoilState(proposalPopupAtom);
  const [isOpen, setIsOpen] = useRecoilState(openAtom);
  const [openId, setOpenId] = useRecoilState(openIdAtom);

  const setPostId = useSetRecoilState(postIdAtom);
  const setIsDetailOpen = useSetRecoilState(detailOpenAtom);
  const setOriginalMealListEntry = useSetRecoilState(originalMealListEntryAtom);

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
        setOriginalMealListEntry([...res.data]);
        setMealListEntry([...res.data]);
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
    setOpenId(id);
    setIsOpen(true);
    fetchBySpotId(id);
  };

  const onMealClick = (postId) => {
    setPostId(postId);
    fetchMeal(postId);
    setProposalData((cur) => ({
      ...cur,
      storeName: selectedMeal.storeName,
      menus: selectedMeal.menus,
    }));
  };

  const closeAll = () => {
    setIsOpen(false);
    setIsDetailOpen(false);
  };
  const toggleSidebar = () => {
    isOpen ? closeAll() : setIsOpen(true);
  };

  return (
    <HomeWrapper>
      <SideBar onMealClick={onMealClick} id={openId} toggle={toggleSidebar} />

      <Map markers={locData} onMarkerClick={findEntry} />
      {proposalData.isOpen && <Proposal />}
    </HomeWrapper>
  );
};

export default Home;

const HomeWrapper = styled.div`
  box-sizing: border-box;
  margin: 0;
`;
