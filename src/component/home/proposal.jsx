import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import proposalPopupAtom from "../../recoil/proposalPopupData/atom";
import styled from "styled-components";
import { useState } from "react";
const Proposal = (props) => {
  const [proposalData, setProposalData] = useRecoilState(proposalPopupAtom);
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
        if (menu.menuId === id) {
          if (!menu.quantity) {
            return { ...menu, quantity: 0 };
          } else if (menu.quantity > 0) {
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
    //return () => onDelClick();
  }, []);

  const { storeName, menus } = proposalData;
  return (
    <PopUpBackground>
      <PopUpWrapper>
        <DelBtnWrapper>
          <DelBtn onClick={onDelClick}>❌</DelBtn>
        </DelBtnWrapper>
        {proposalData && (
          <div>
            <div>{storeName}</div>
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

        <div>
          {proposalData.menus.map(
            (menu) =>
              menu.quantity &&
              menu.quantity > 0 && (
                <div>
                  <div>{menu.name}</div>
                  <div>{menu.quantity}</div>
                  <div>{menu.price * menu.quantity}</div>
                </div>
              )
          )}
          <div></div>
        </div>
      </PopUpWrapper>
    </PopUpBackground>
  );
};

export default Proposal;

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
  height: 70%;
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
  padding: 0 5rem;
  padding-bottom: 5rem;
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
  text-align: right;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  position: absolute;
`;

const DelBtn = styled.span`
  display: inline-block;
  cursor: pointer;
`;
