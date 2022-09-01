import React, { useState, useEffect } from "react";
import { PHONE_FIRST_NUM } from "../../../constants/arrays";
import PhoneNumInput from "../../signup/PhoneNumInput";
import AddressInput from "../AddressInput";
import CategorySelector from "./CategorySelector";
import Menu from "./Menu";
import MenuInput from "./MenuInput";
import MoneyInput from "./MoneyInput";
import StoreNameInput from "./StoreNameInput";
import TimeInput from "./TimeInput";
import axios from "axios";
import { useNavigate } from "react-router";

const RegisterInputs = () => {
  const navigate = useNavigate();
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
  const [menus, setMenus] = useState([]); //{ name: "", price: 0, imgUrl: "" }

  const onRegisterClick = () => {
    if (!checkForm()) return;
    register();
    navigate("/manager");
  };

  const register = async () => {
    try {
      await axios.post(
        "http://localhost:8080/store",
        {
          name: storeName,
          phone: phone.first + phone.middle + phone.last,
          deliveryFee: deliveryFee,
          address: address,
          businessHours: time.businessTime,
          breakTime: time.breakTime,
          category: category,
          menus: menus.map((m) => ({
            name: m.name,
            price: m.price,
            imageUrl: m.imgUrl,
          })),
        },
        { headers: { Authorization: localStorage.getItem("Authorization") } }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const checkForm = () => {
    switch (true) {
      case storeName === "":
        alert("상호명을 입력해주세요");
        return false;
      case phone.first === "" || phone.middle === "" || phone.last === "":
        alert("전화번호를 정확히 입력해주세요");
        return false;
      case address === "":
        alert("주소를 입력해주세요");
        return false;
      case category === "":
        alert("카테고리를 입력해주세요");
        return false;
      case time.businessTime === "":
        alert("가게 영업 시간을 입력해주세요");
        return false;
      case menus.length === 0:
        alert("메뉴를 하나 이상 입력해주세요");
        return false;
      default:
        return true;
    }
  };
  useEffect(() => {
    // console.log(storeName);
    // console.log(deliveryFee);
    // console.log(phone);
    // console.log(menus);
    // console.log(address);
  }, [storeName, deliveryFee, phone, time, menus, address]);
  return (
    <div>
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
          <MoneyInput money={deliveryFee} setMoney={setDeliveryFee} />
        </div>
        <div>
          <strong>주소</strong>
          <AddressInput setAddress={setAddress} />
        </div>
        <div>
          <strong>음식 카테고리</strong>
          <CategorySelector setData={setCategory} />
        </div>
        <div>
          <strong>영업 시간</strong>
          <TimeInput typeKey={"businessTime"} setTime={setTime} />
        </div>
        <div>
          <strong>브레이크 타임</strong>
          <TimeInput typeKey={"breakTime"} setTime={setTime} />
        </div>
        <div>
          <div>
            <strong>메뉴 등록</strong>
          </div>
          <MenuInput setMenus={setMenus} />
          {menus.map((m, key) => (
            <Menu
              key={`register_input_${key}`}
              imgUrl={m.imgUrl}
              price={m.price}
              name={m.name}
              setMenus={setMenus}
            />
          ))}
        </div>
      </div>
      <button onClick={onRegisterClick}>등록하기</button>
    </div>
  );
};

export default RegisterInputs;
