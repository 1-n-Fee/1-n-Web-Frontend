import React, { useState, useEffect } from "react";
import { PHONE_FIRST_NUM } from "../../../constants/arrays";
import PhoneNumInput from "../../signup/PhoneNumInput";
import AddressInput from "./AddressInput";
import CategorySelector from "./CategorySelector";
import Menu from "./Menu";
import MenuInput from "./MenuInput";
import MoneyInput from "./MoneyInput";
import StoreNameInput from "./StoreNameInput";
import TimeInput from "./TimeInput";
import axios from "axios";
import { useNavigate } from "react-router";
import {
  InputWrapper,
  SignUpInputsWrapper,
  SubmitBtn,
  Title,
} from "../../style/SignUpStyle";
import styled from "styled-components";

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
  };

  const register = async () => {
    const data = {
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
    };
    console.log(data);
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
      alert("가게가 등록되었습니다.");
      navigate("/manager");
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
    <SignUpInputsWrapper>
      <div>
        <InputWrapper>
          <Title>상호명</Title>
          <StoreNameInput name={storeName} setName={setStoreName} />
        </InputWrapper>
        <InputWrapper>
          <Title>가게 전화번호</Title>
          <PhoneNumInput
            firstKey={"first"}
            midKey={"middle"}
            lastKey={"last"}
            setData={setPhone}
            firstNums={PHONE_FIRST_NUM}
          />
        </InputWrapper>
        <InputWrapper>
          <Title>배달비</Title>
          <MoneyInput money={deliveryFee} setMoney={setDeliveryFee} />
        </InputWrapper>
        <InputWrapper height={"none"}>
          <Title>주소</Title>
          <AddressInput setAddress={setAddress} />
        </InputWrapper>
        <InputWrapper>
          <Title>음식 카테고리</Title>
          <CategorySelector setData={setCategory} />
        </InputWrapper>
        <InputWrapper>
          <Title>영업 시간</Title>
          <TimeInput typeKey={"businessTime"} setTime={setTime} />
        </InputWrapper>
        <InputWrapper>
          <Title>브레이크 타임</Title>
          <TimeInput typeKey={"breakTime"} setTime={setTime} />
        </InputWrapper>
        <InputWrapper height={"none"}>
          <Title>메뉴 등록</Title>
          <MenuSectionWrapper>
            <MenuInput setMenus={setMenus} />
            <MenuWrapper>
              {menus.map((m, key) => (
                <Menu
                  key={`register_input_${key}`}
                  imgUrl={m.imgUrl}
                  price={m.price}
                  name={m.name}
                  setMenus={setMenus}
                />
              ))}
            </MenuWrapper>
          </MenuSectionWrapper>
        </InputWrapper>
      </div>
      <SubmitBtn onClick={onRegisterClick}>등록하기</SubmitBtn>
    </SignUpInputsWrapper>
  );
};

export default RegisterInputs;

const MenuSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuWrapper = styled.div`
  max-height: 250px;
  overflow: auto;
  margin: 8px 0;
`;
