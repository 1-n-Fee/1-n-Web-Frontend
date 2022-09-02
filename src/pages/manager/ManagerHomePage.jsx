import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StoreInfo from "./../../component/manager/home/StoreInfo";
import styled from "styled-components";
import Underline from "./../../component/common/Underline";
import { SubmitBtn } from "../../component/style/SignUpStyle";

const ManagerHomePage = () => {
  const navigate = useNavigate();
  const [storeInfo, setStoreInfo] = useState({});

  useEffect(() => {
    // 가게 정보 있으면 가져오기 판단
    getStoreInfo();
  }, []);

  const getStoreInfo = async () => {
    try {
      const response = axios.get("http://localhost:8080/store/storemanager", {
        headers: { Authorization: localStorage.getItem("Authorization") },
      });

      setStoreInfo(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const isEmptyObject = (obj) => {
    return (
      obj === null ||
      obj === undefined ||
      Object.keys(obj).length === 0 ||
      obj.constructor !== Object
    );
  };
  const onClick = () => {
    navigate("/register");
  };
  return (
    <ManagerHomePageWrapper>
      <H2>사업자 페이지</H2>
      <Underline width={"700px"} />

      {isEmptyObject(storeInfo) ? (
        <NoStoreWrapper>
          <h3>등록된 가게가 없습니다🥲</h3>
          <SubmitBtn width={"300px"} onClick={onClick}>
            가게 등록하기
          </SubmitBtn>
        </NoStoreWrapper>
      ) : (
        <StoreInfo
          storeName={storeInfo.name}
          category={storeInfo.category}
          phone={storeInfo.phone}
          deliveryFee={storeInfo.deliveryFee}
          businessTime={storeInfo.businessTime}
          breakTime={storeInfo.breakTime}
        />
      )}
    </ManagerHomePageWrapper>
  );
};

export default ManagerHomePage;

const ManagerHomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0 0 0;
`;

const H2 = styled.h2`
  margin: 10px 0px;
`;
const NoStoreWrapper = styled.div`
  border-radius: 10px;
  background-color: #dbdbd0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 300px;
  margin: 20px 0;
`;
