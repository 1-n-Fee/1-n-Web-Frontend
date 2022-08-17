import React, { useState, useRef } from "react";
import styled from "styled-components";
const locData = [];
const restaurantData = [
  // TODO: 서버에서 음식점 리스트 GET
  "영심이",
  "ㅇ라ㅓ",
  "샐러드",
  "김밥집",
];
const CreateRoom = (props) => {
  const [isManual, setIsManual] = useState(false);
  const [menuInput, setMenuInput] = useState({
    id: "",
    menuName: "",
    menuPrice: "",
  });
  const [menuList, setMenuList] = useState([]);
  const [roomData, setRoomData] = useState({
    restaurant: "",
    loc: "",
    delivery: "",
    maxNum: "",
  });
  const onRestaurantChange = (e) => {
    const value = e.target.value;
    setRoomData((cur) => ({ ...cur, restaurant: value }));
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
  const onRoomCreate = () => {
    // TODO: HTTP POST 요청
    // TODO: 어디로 navigate ?
  };

  const nextId = useRef(0);
  return (
    <RoomContainer>
      <RoomWrapper>
        <h1>방 만들기</h1>
        <div>
          <span>음식점 이름</span>
          <select onChange={onRestaurantChange}>
            <option name="placeholder" defaultValue={true}></option>
            {restaurantData.map((rd, rdKey) => (
              <option key={`restaurant_${rdKey}`} value={rd}>
                {rd}
              </option>
            ))}
          </select>
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
                setRoomData((cur) => ({ ...cur, loc: e.target.value }))
              }
            >
              <option name="placeholder" defaultValue={true}></option>
              {locData.map((ld) => (
                <option key={`location${ld.id}`} value={ld.id}>
                  {ld.name}
                </option>
              ))}
            </SelectWrapper>
          </InputWrapper>

          <InputWrapper>
            <label htmlFor="delivery">배달비</label>
            <TextWrapper
              name="delivery"
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
                setRoomData((cur) => ({ ...cur, maxNum: e.target.value }))
              }
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
