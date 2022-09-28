import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import RegisterInputs from "../../component/manager/storeRegister/RegisterInputs";
import Underline from "./../../component/common/Underline";
import { useRecoilState } from "recoil";
import managerStoreDataAtom from "../../recoil/managerStoreData/atom";
import axios from "axios";
import { useNavigate } from "react-router";

const StoreRegisterPage = () => {
  const navigate = useNavigate();
  const [managerStoreData, setManagerStoreData] =
    useRecoilState(managerStoreDataAtom);

  // useEffect(() => {
  //   console.log(managerStoreData.hasStore);
  //   if (managerStoreData.hasStore) {
  //     alert(
  //       "이미 등록된 가게가 존재합니다!\n가게는 한 계정당 하나만 등록 가능합니다.\n홈 화면으로 이동합니다."
  //     );
  //     navigate("/");
  //   }
  // }, [managerStoreData]);

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
      setManagerStoreData({ hasStore: !isEmptyObject(data) });
      if (!isEmptyObject(data)) {
        alert(
          "이미 등록된 가게가 존재합니다!\n가게는 한 계정당 하나만 등록 가능합니다.\n홈 화면으로 이동합니다."
        );
        navigate("/");
      }
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

  return (
    <StoreRegisterPageWrapper>
      <H2>가게 등록하기</H2>
      <Underline width={"700px"} />
      <RegisterInputs />
    </StoreRegisterPageWrapper>
  );
};

export default StoreRegisterPage;

const StoreRegisterPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0 0 0;
`;

const H2 = styled.h2`
  padding: 0 0 10px 0;
`;
