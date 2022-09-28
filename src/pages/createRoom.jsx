import React, { useState, useRef, useEffect } from "react";
import { locData } from "../locData";
import { useNavigate } from "react-router";
import styled from "styled-components";
import axios from "axios";
import { useRecoilState } from "recoil";
import { createDataAtom, roomDataAtom } from "../recoil/createroomData/atom";
import CreateRoomPopup from "../component/createRoom/createRoomPopup";

const CreateRoom = (props) => {
  const navigate = useNavigate();
  const [isManual, setIsManual] = useState(false);
  const [menuInput, setMenuInput] = useState({
    id: "",
    menuName: "",
    menuPrice: "",
  });
  const [menuList, setMenuList] = useState([]);

  const [roomData, setRoomData] = useRecoilState(roomDataAtom);

  const onRestaurantChange = (e) => {
    const value = e.target.value;
    setRoomData((cur) => ({ ...cur, storeId: value }));
  };
  const onManualCheck = (checked) => {
    if (checked) {
      setIsManual(true);
    } else {
      setIsManual(false);
    }
  };
  const onRemove = (id) => {
    setMenuList(menuList.filter((menu) => menu.id !== id));
  };
  const { menuName, menuPrice } = menuInput;

  const onCreate = () => {
    const menu = {
      id: nextId.current,
      menuName,
      menuPrice,
    };
    setMenuList((cur) => [...cur, menu]);
    nextId.current += 1;
    setMenuInput({
      id: "",
      menuName: "",
      menuPrice: "",
    });
  };
  const checkRoomData = () => {
    switch (true) {
      case roomData.closeTime === "":
      case roomData.content === "":
      case roomData.delivery === "":
      case roomData.limitNumber === "":
      case roomData.spotId === "":
      case roomData.storeId === "":
        return false;
      default:
        return true;
    }
  };
  const onRoomCreate = () => {
    const auth = localStorage.getItem("Authorization");
    const arr = [];
    arr.push(roomData.closeTime.year);
    arr.push(roomData.closeTime.month);
    arr.push(roomData.closeTime.day);
    arr.push(roomData.closeTime.hour);
    arr.push(roomData.closeTime.min);

    const closeTime = arr.join(".");
    console.log(closeTime);
    const { spotId, content, storeId, limitNumber } = roomData;
    console.log(roomData);
    const check = checkRoomData();
    if (!check) {
      alert("모든 입력란을 입력해 주세요");
      return;
    }
    axios
      .post(
        "http://localhost:8080/post",
        {
          spotId,
          content,
          limitNumber,
          storeId,
          closeTime,
        },
        {
          headers: {
            Authorization: auth,
          },
        }
      )
      .then((res) => {
        // TODO: 방 생성 성공 후 이동 페이지 지정: 히스토리 vs Home 페이지?
        navigate("/");
        console.log(res);
      })
      .catch((e) => {
        console.log(e.response.data);
        if (e.response.data.errorCode === "T001") {
          // TODO: 유효기간 지난 토큰 재발급 수행
          // or 로그인 페이지로 이동?
          alert("로그아웃 되었습니다. 로그인 페이지로 이동합니다");
          navigate("/login");
        }
      });
  };

  const nextId = useRef(0);
  const [createData, setCreateData] = useRecoilState(createDataAtom);

  useEffect(() => setCreateData((cur) => ({ ...cur, isPopUpOpen: false })), []);

  return (
    <RoomContainer>
      {createData.isPopUpOpen && <CreateRoomPopup />}
      <RoomWrapper>
        <h1>방 만들기</h1>
        <div>
          <span>음식점 이름</span>
          <input type="text" value={roomData.storeName} disabled />
          <button
            onClick={() =>
              setCreateData((cur) => ({ ...cur, isPopUpOpen: true }))
            }
          >
            검색
          </button>

          <input
            type="checkbox"
            name="isManual"
            onChange={(e) => onManualCheck(e.target.checked)}
          />
          <label htmlFor="isManual">직접 입력</label>
        </div>
        {isManual && (
          <div>
            <label htmlFor="menuName">메뉴명</label>
            <ManualWrapper
              type="text"
              name="menuName"
              value={menuName}
              onChange={(e) =>
                setMenuInput((cur) => ({ ...cur, menuName: e.target.value }))
              }
            />
            <PriceWrapper
              type="text"
              name="menuPrice"
              value={menuPrice}
              onChange={(e) =>
                setMenuInput((cur) => ({ ...cur, menuPrice: e.target.value }))
              }
            />
            <label htmlFor="menuPrice">원</label>
            <ManualButton onClick={onCreate}>+</ManualButton>
            <ul>
              {menuList.map((menu) => (
                <UlWrapper>
                  <li>
                    <span key={menu.id}>
                      {menu.menuName} {menu.menuPrice}
                    </span>
                  </li>
                  <DeleteButton onClick={() => onRemove(menu.id)}>
                    -
                  </DeleteButton>
                </UlWrapper>
              ))}
            </ul>
          </div>
        )}
        <InputsWrapper>
          <InputWrapper>
            <label htmlFor="location">위치</label>
            <SelectWrapper
              name="location"
              onChange={(e) =>
                setRoomData((cur) => ({ ...cur, spotId: e.target.value }))
              }
            >
              <option name="placeholder" defaultValue={true}></option>
              {locData.map((ld) => (
                <option key={`location${ld.id}`} value={ld.id}>
                  {ld.loc}
                </option>
              ))}
            </SelectWrapper>
          </InputWrapper>

          <InputWrapper>
            <label htmlFor="delivery">배달비</label>
            <TextWrapper
              name="delivery"
              value={roomData.delivery}
              onChange={(e) =>
                setRoomData((cur) => ({ ...cur, delivery: e.target.value }))
              }
            />
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="maxNum">목표 인원</label>
            <TextWrapper
              name="maxNum"
              onChange={(e) =>
                setRoomData((cur) => ({ ...cur, limitNumber: e.target.value }))
              }
            />
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="content">설명</label>
            <TextWrapper
              type="text"
              name="content"
              onChange={(e) =>
                setRoomData((cur) => ({ ...cur, content: e.target.value }))
              }
            />
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="closeTime">모집 마감 시간</label>
            <input
              type="date"
              onChange={(e) => {
                console.log(e.target.value);
                const date = e.target.value.split("-");
                console.log(date);
                setRoomData((cur) => ({
                  ...cur,
                  closeTime: {
                    ...roomData.closeTime,
                    year: date[0],
                    month: date[1],
                    day: date[2],
                  },
                }));
                console.log(roomData.closeTime);
              }}
            />
            <input
              type="time"
              name="closeTime"
              onChange={(e) => {
                console.log(e.target.value);
                const time = e.target.value.split(":");
                console.log(time);
                setRoomData((cur) => ({
                  ...cur,
                  closeTime: {
                    ...roomData.closeTime,
                    hour: time[0],
                    min: time[1],
                  },
                }));
                console.log(roomData.closeTime);
              }}
            />
          </InputWrapper>
          <ButtonWrapper onClick={onRoomCreate}>방 생성하기</ButtonWrapper>
        </InputsWrapper>
      </RoomWrapper>
    </RoomContainer>
  );
};

export default CreateRoom;

const RoomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const RoomWrapper = styled.div`
  display: flex;
  height: 20rem;
  flex-direction: column;
  align-items: center;
  width: 40%;
`;
const InputsWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const InputWrapper = styled.div`
  margin-top: 2rem;
`;
const ButtonWrapper = styled.button`
  width: 100%;
  height: 2rem;
  margin-top: 2rem;
  text-align: center;
`;
const SelectWrapper = styled.select`
  width: 10rem;
`;
const TextWrapper = styled.input`
  width: 10rem;
`;
const ManualWrapper = styled(TextWrapper)`
  width: 8rem;
`;
const PriceWrapper = styled(ManualWrapper)`
  width: 5rem;
`;
const ManualButton = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: rgba(1, 1, 1, 0.3);
  text-align: center;
`;
const DeleteButton = styled(ManualButton)`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.5rem;
`;
const UlWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;
