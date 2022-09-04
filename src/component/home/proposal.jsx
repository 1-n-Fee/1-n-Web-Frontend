import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import proposalPopupAtom from "../../recoil/proposalPopupData/atom";
import styled from "styled-components";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Proposal = (props) => {
  const [proposalData, setProposalData] = useRecoilState(proposalPopupAtom);
  const [sum, setSum] = useState(0);
  const { postId } = proposalData;
  const onDelClick = () => {
    setProposalData({
      isOpen: false,
      postId: "",
      storeName: "",
      menus: [],
    });
  };
  const [sendData, setSendData] = useState({
    postId,
    menus: [],
  });
  const onMenuAdd = (id) => {
    setProposalData((cur) => ({
      ...cur,
      menus: menus.map((menu) => {
        if (menu.menuId && id && menu.menuId === id) {
          console.log(menu.menuId);
          console.log(id);
          setSum((cur) => cur + menu.price);

          if (!menu.quantity) {
            return { ...menu, quantity: 1 };
          } else {
            return { ...menu, quantity: menu.quantity + 1 };
          }
        } else {
          return menu;
        }
      }),
    }));
  };
  const onMenuSub = (id) => {
    setProposalData((cur) => ({
      ...cur,
      menus: menus.map((menu) => {
        if (menu.menuId && id && menu.menuId === id) {
          if (!menu.quantity) {
            return { ...menu, quantity: 0 };
          } else if (menu.quantity > 0) {
            setSum((cur) => (cur - menu.price < 0 ? 0 : cur - menu.price));

            return { ...menu, quantity: menu.quantity - 1 };
          } else {
            return menu;
          }
        } else {
          return menu;
        }
      }),
    }));
  };
  const postProposal = async () => {
    const auth = localStorage.getItem("Authorization");
    const menus = proposalData.menus.map((menu) => {
      let newObj = {};
      newObj["menuId"] = menu.menuId;
      newObj["quantity"] = menu.quantity;
      console.log(newObj);
      return newObj;
    });
    await axios
      .post(
        "http://localhost:8080/proposal",
        {
          postId,
          menus: menus.filter((menu) => menu.quantity > 0),
        },
        {
          headers: {
            Authorization: auth,
          },
        }
      )
      .then((res) => {
        console.log(res);
        alert("제안서가 접수되었습니다.");
        setProposalData((cur) => ({
          isOpen: false,
          postId: "",
          storeName: "",
          menus: [],
        }));
      })
      .catch((e) => console.log(e));
  };
  const submitProposal = () => {
    if (sum <= 0) {
      alert("메뉴를 선택하세요");
      return;
    }
    postProposal();
  };
  useEffect(() => {
    const fetchMeal = async (postId) => {
      const auth = localStorage.getItem("Authorization");
      await axios
        .get(`http://localhost:8080/post/${postId}`, {
          headers: {
            Authorization: auth,
          },
        })
        .then((res) => {
          console.log("fetchMeal");
          console.log(res);
          setProposalData((cur) => ({
            ...cur,
            storeName: res.data.storeName,
            menus: res.data.menus,
          }));
        })
        .catch((e) => console.log(e));
    };
    fetchMeal(postId);
    return () => {
      onDelClick();
      setSum(0);
    };
  }, []);

  const { storeName, menus } = proposalData;
  return (
    <PopUpBackground>
      <PopUpWrapper>
        <DelBtnWrapper>
          <FontAwesomeIcon
            onClick={onDelClick}
            icon={solid("chevron-left")}
            style={{ cursor: "pointer" }}
          />
        </DelBtnWrapper>
        {proposalData && (
          <div>
            <StoreWrapper>{storeName}</StoreWrapper>
            <div>
              <ul>
                <MenuWrapper>
                  {menus.map((menu) => (
                    <EntryWrapper>
                      <MenuInfoWrapper>
                        <div>{menu.name}</div>
                        <PriceWrapper>
                          <SpanWrapper>가격</SpanWrapper> {menu.price} 원
                        </PriceWrapper>
                        <QuantityWrapper>
                          <button onClick={() => onMenuSub(menu.menuId)}>
                            -
                          </button>
                          {menu.quantity ? (
                            <div>{menu.quantity}</div>
                          ) : (
                            <div>0</div>
                          )}
                          <button onClick={() => onMenuAdd(menu.menuId)}>
                            +
                          </button>
                        </QuantityWrapper>
                      </MenuInfoWrapper>

                      <MealImgWrapper
                        src={`http://localhost:8080/image/menu/${menu.image}`}
                        alt="menu"
                      />
                    </EntryWrapper>
                  ))}
                </MenuWrapper>
              </ul>
            </div>
          </div>
        )}

        <OrderWrapper>
          {proposalData.menus.map(
            (menu) =>
              menu.quantity > 0 && (
                <FlexWrapper>
                  <NameWrapper>{menu.name}</NameWrapper>
                  <DefWrapper>{menu.quantity}</DefWrapper>
                  <DefWrapper>{menu.price * menu.quantity}</DefWrapper>
                </FlexWrapper>
              )
          )}
          <SumWrapper>{sum}</SumWrapper>
        </OrderWrapper>

        <SubmitWrapper onClick={submitProposal}>제출하기</SubmitWrapper>
      </PopUpWrapper>
    </PopUpBackground>
  );
};

export default Proposal;

const SubmitWrapper = styled.button`
  width: 70%;
  padding: 0.5rem 0;
  margin-top: 1rem;
  border: none;
  border-radius: 7px;
  background-color: #b2acfa;
  color: white;
`;
const StoreWrapper = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 1rem 0;
`;
const SumWrapper = styled.div`
  width: 100%;
  text-align: right;
  margin-top: 5px;
  border-top: solid rgba(0, 0, 0, 0.3) 2px;
`;
const DefWrapper = styled.div`
  text-align: right;
  width: 5rem;
`;
const NameWrapper = styled.div`
  text-align: center;
  width: 12rem;
`;
const OrderWrapper = styled.div`
  width: 70%;
  margin-top: 2rem;
`;
const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;
const MenuInfoWrapper = styled.div`
  padding: 0.4rem 0.3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const EntryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: solid rgba(0, 0, 0, 0.5);
  border-width: 1px;
`;
const MenuWrapper = styled.ul`
  overflow-y: auto;
  height: 300px;
`;
const MealImgWrapper = styled.img`
  width: 140px;
  height: 100px;
  border: solid rgba(0, 0, 0, 0.3) 2px;
`;
const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;
const SpanWrapper = styled.div`
  width: 2rem;
  text-align: center;
  font-size: 0.7rem;
  padding: 0.1rem 0.2rem;
  border-radius: 0.5rem;
  background-color: #b2acfa;
  color: white;
`;
const PopUpWrapper = styled.div`
  width: 700px;
  height: 500px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  position: relative;
  padding: 3rem 5rem;
  z-index: 99;
`;

const PopUpBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 98;
`;

const DelBtnWrapper = styled.div`
  font-size: 1.2rem;
  text-align: left;
  color: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  position: absolute;
  left: 1rem;
  top: 1rem;
`;

const DelBtn = styled.span`
  display: inline-block;
  cursor: pointer;
`;
