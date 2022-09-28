import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StoreInfo from "./../../component/manager/home/StoreInfo";
import styled from "styled-components";
import Underline from "./../../component/common/Underline";
import { SubmitBtn } from "../../component/style/SignUpStyle";
import managerStoreDataAtom from "./../../recoil/managerStoreData/atom";
import { useRecoilState } from "recoil";

const ManagerHomePage = () => {
  const navigate = useNavigate();
  const [storeInfo, setStoreInfo] = useState({});
  const [managerStoreData, setManagerStoreData] =
    useRecoilState(managerStoreDataAtom);

  useEffect(() => {
    // 가게 정보 있으면 가져오기 판단
    getStoreInfo();
  }, []);

  const getStoreInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/store/storemanager",
        {
          headers: { Authorization: localStorage.getItem("Authorization") },
        }
      );
      const data = response.data;
      if (isEmptyObject(data)) {
        setStoreInfo({});
        setManagerStoreData({ hasStore: false });
        return;
      }

      setManagerStoreData({ hasStore: true });
      setStoreInfo({
        storeName: data.name,
        category: data.category,
        phone: data.phone,
        deliveryFee: data.deliveryFee,
        businessTime: data.businessHours,
        breakTime: data.breakTime,
      });
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

      {managerStoreData.hasStore && !isEmptyObject(storeInfo) ? (
        <StoreWrapper>
          <StoreInfo
            storeName={storeInfo.storeName}
            category={storeInfo.category}
            phone={storeInfo.phone}
            deliveryFee={storeInfo.deliveryFee}
            businessTime={storeInfo.businessTime}
            breakTime={storeInfo.breakTime}
          />
        </StoreWrapper>
      ) : (
        <StoreWrapper>
          <h3>등록된 가게가 없습니다🥲</h3>
          <SubmitBtn width={"300px"} onClick={onClick}>
            가게 등록하기
          </SubmitBtn>
        </StoreWrapper>
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
  margin: 10px 0px 20px 0;
`;
const StoreWrapper = styled.div`
  border-radius: 10px;
  background-color: #dbdbd0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 300px;
  margin: 30px 0 20px 0;
`;
