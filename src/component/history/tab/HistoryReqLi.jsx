import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk, faEquals } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { COLOR } from "./../../../constants/colors";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import {
  isHistoryDataChangedAtom,
  isProposalDataChangedAtom,
} from "../../../recoil/historyData/atom";
import TriangleArrow from "../../common/icons/TriangleArrow";

const RESPOND = {
  ACCEPT: "ACCEPT",
  DENY: "DENY",
};

Object.freeze(RESPOND);

const HistoryReqLi = ({ nickname, menus, proposalId }) => {
  const setIsHistoryDataChanged = useSetRecoilState(isHistoryDataChangedAtom);
  const setIsProposalDataChanged = useSetRecoilState(isProposalDataChangedAtom);
  const [isMenuListOpened, setIsMenuListOpened] = useState(false);
  const onRespondClick = async (e) => {
    const response = e.target.dataset.respond;
    try {
      await axios.post(
        "http://localhost:8080/proposal/approve",
        {
          proposalId: proposalId,
          isApprove: response === RESPOND.ACCEPT,
        },
        { headers: { Authorization: localStorage.getItem("Authorization") } }
      );
      setIsHistoryDataChanged(true);
      setIsProposalDataChanged(true);
    } catch (err) {
      console.log(err);
    }
  };

  const onMenusClick = () => {
    setIsMenuListOpened((cur) => !cur);
  };
  return (
    <HistoryReqList>
      <TotalBtnsWrapper>
        <TextWrapper>
          <strong>{nickname}</strong>
          <span>님이 참여요청을 보냈습니다.</span>
          <MenuButton onClick={onMenusClick}>
            메뉴 <TriangleArrow isDown={!isMenuListOpened} />
          </MenuButton>
        </TextWrapper>

        <ResponseBtnWrapper>
          <button data-respond={RESPOND.ACCEPT} onClick={onRespondClick}>
            수락
          </button>
          <button data-respond={RESPOND.DENY} onClick={onRespondClick}>
            거절
          </button>
        </ResponseBtnWrapper>
      </TotalBtnsWrapper>

      <MenusWrapper>
        {isMenuListOpened && (
          <div>
            <ul>
              {menus.map((m, key) => (
                <MenuList key={`req_menu_${key}`}>
                  {"- "}
                  <span>
                    {m.name}
                    <IconWrapper>
                      <FontAwesomeIcon icon={faAsterisk} />
                    </IconWrapper>
                    {m.quantity}개
                    <IconWrapper>
                      <FontAwesomeIcon icon={faEquals} />
                    </IconWrapper>
                  </span>
                  <strong>{(m.price * m.quantity).toLocaleString()}원</strong>
                </MenuList>
              ))}
            </ul>
          </div>
        )}
      </MenusWrapper>
    </HistoryReqList>
  );
};
HistoryReqLi.propTypes = {
  nickname: PropTypes.string.isRequired,
  menus: PropTypes.arrayOf(PropTypes.object).isRequired,
  proposalId: PropTypes.number.isRequired,
};

export default HistoryReqLi;

const HistoryReqList = styled.li`
  width: 100%;
  border-bottom: thick double ${COLOR.DARK_GRAY};
  padding-top: 5px;
`;

const IconWrapper = styled.span`
  font-size: 13px;
  color: ${COLOR.DARKER_GRAY};
`;

const TotalBtnsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px 5px;
`;

const MenuButton = styled.button`
  display: inline-block;
  font-size: 11px;
  color: ${COLOR.DARKER_GRAY};
`;
const ResponseBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextWrapper = styled.div`
  flex-grow: 1;
`;

const MenusWrapper = styled.div`
  border-radius: 4px;
  padding: 5px 8px;
`;

const MenuList = styled.li`
  border-top: 0.5px dashed ${COLOR.LIGHT_GRAY};
  padding: 4px 10px;
`;
