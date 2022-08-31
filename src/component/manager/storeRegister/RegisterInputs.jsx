import React, { useState, useEffect } from "react";
import { PHONE_FIRST_NUM } from "../../../constants/phoneFirstNum";
import PhoneNumInput from "../../signup/PhoneNumInput";
import DeliveryFeeInput from "./DeliveryFeeInput";
import StoreNameInput from "./StoreNameInput";

const RegisterInputs = () => {
  const [storeName, setStoreName] = useState("");
  const [phone, setPhone] = useState({
    first: "",
    middle: "",
    last: "",
  });
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [time, setTime] = useState({
    businessTime: "",
    breakTime: "",
  });
  const [menus, setMenus] = useState([{ name: "", price: 0, imgUrl: "" }]);

  useEffect(() => {
    // console.log(storeName);
    // console.log(deliveryFee);
    console.log(phone);
  }, [storeName, deliveryFee, phone]);
  return (
    <div>
      <div>
        <strong>상호명</strong>
        <StoreNameInput name={storeName} setName={setStoreName} />
      </div>
      <div>
        <strong>가게 전화번호</strong>
        <PhoneNumInput
          firstKey={"first"}
          midKey={"middle"}
          lastKey={"last"}
          setData={setPhone}
          firstNums={PHONE_FIRST_NUM}
        />
      </div>
      <div>
        <strong>배달비</strong>
        <DeliveryFeeInput
          deliveryFee={deliveryFee}
          setDeliveryFee={setDeliveryFee}
        />
      </div>
      <div>
        <strong>주소</strong>
      </div>
      <div>
        <strong>음식 카테고리</strong>
      </div>
      <div>
        <strong>영업 시간</strong>
      </div>
      <div>
        <strong>브레이크 타임</strong>
      </div>
      <div>
        <strong>메뉴</strong>
      </div>
    </div>
  );
};

export default RegisterInputs;
