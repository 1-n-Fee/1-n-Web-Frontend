import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StoreInfo from "./../../component/manager/home/StoreInfo";

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
    return Object.keys(obj).length === 0 || obj.constructor !== Object;
  };
  const onClick = () => {
    navigate("/manager/register");
  };
  return (
    <div>
      {isEmptyObject(storeInfo) ? (
        <StoreInfo
          storeName={storeInfo.name}
          category={storeInfo.category}
          phone={storeInfo.phone}
          deliveryFee={storeInfo.deliveryFee}
          businessTime={storeInfo.businessTime}
          breakTime={storeInfo.breakTime}
        />
      ) : (
        <>
          <h3>등록된 가게가 없습니다🥲</h3>
          <button onClick={onClick}>가게 등록하기</button>
        </>
      )}
    </div>
  );
};

export default ManagerHomePage;
