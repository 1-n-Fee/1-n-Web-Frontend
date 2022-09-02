import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import MoneyInput from "./MoneyInput";
import PlusIcon from "../../common/icons/PlusIcon";
import styled from "styled-components";
import { COLOR } from "./../../../constants/colors";
import { useCallback } from "react";
import Thumbnail from "./Thumbnail";
import { SignUpInputStyle } from "../../style/SignUpStyle";

const MenuInput = ({ setMenus }) => {
  const [imgUrl, setImgUrl] = useState("");
  const [menuName, setMenuName] = useState("");
  const [price, setPrice] = useState(0);

  const onImgChange = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("menuImage", e.target.files[0]);

    uploadImg(formData);
  };

  const onNameChange = (e) => {
    setMenuName(e.target.value);
  };

  const onAddMenuClick = () => {
    if (!checkForm()) return;
    setMenus((cur) => [
      ...cur,
      { name: menuName, price: price, imgUrl: imgUrl },
    ]);
    initInput();
  };

  const initInput = useCallback(() => {
    setImgUrl("");
    setMenuName("");
    setPrice(0);
  }, []);

  const checkForm = useCallback(() => {
    if (menuName === "") {
      alert("메뉴명을 입력해주세요");
      return false;
    }
    return true;
  }, [menuName]);

  const uploadImg = async (formData) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/store/menu/image",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImgUrl(response.data.imageStoreUrl[0]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <MenuInputWrapper>
      <FileInput
        type="file"
        id="file-input"
        accept="image/*"
        onChange={onImgChange}
      />
      <label htmlFor="file-input">
        <div>
          {imgUrl === "" ? (
            <ImageInput>
              <PlusIcon />
            </ImageInput>
          ) : (
            <Thumbnail imgUrl={imgUrl} />
          )}
        </div>
      </label>
      <InputsWrapper>
        <div>
          {/* <InputTitle>메뉴명</InputTitle> */}
          <SignUpInputStyle
            width={"150px"}
            placeholder="메뉴명"
            type="text"
            value={menuName}
            onChange={onNameChange}
          />
        </div>
        <div>
          {/* <InputTitle>가격</InputTitle> */}
          <MoneyInput money={price} setMoney={setPrice} />
        </div>
      </InputsWrapper>
      <AddMenuBtn onClick={onAddMenuClick}>
        <PlusIcon />
      </AddMenuBtn>
    </MenuInputWrapper>
  );
};

MenuInput.propTypes = {
  setMenus: PropTypes.func.isRequired,
};

export default MenuInput;

const FileInput = styled.input`
  display: none;
`;

const MenuInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ImageInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  width: 60px;
  height: 60px;
  border-radius: 4px;
  margin: 0px 8px 0 0;
  background-color: ${COLOR.LIGHT_GRAY};
  &:hover {
    cursor: pointer;
  }
`;

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddMenuBtn = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 0 8px;
  border: 2px dashed ${COLOR.DARKER_GRAY};
  &:hover {
    background-color: ${COLOR.LIGHT_GRAY};
  }
`;
