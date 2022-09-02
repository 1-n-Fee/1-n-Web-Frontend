import React from "react";
import { FOOD_CATEGORY } from "../../../constants/arrays";
import Tag from "../../common/Tag";
import PropTypes from "prop-types";
import styled from "styled-components";
import { COLOR } from "../../../constants/colors";

const StoreInfo = ({
  storeName,
  category,
  phone,
  deliveryFee,
  businessTime,
  breakTime,
}) => {
  const timeConveter = (timeStr) => {
    let times = timeStr.split("-");
    times = times.map((t) => `${t.substring(0, 1)}:${t.substring(2)}`);
    return `${times[0]}~${times[1]}`;
  };
  return (
    <>
      <h3>
        {storeName}
        <Tag
          title={
            FOOD_CATEGORY.find((c) => c.ENG === category.toLowerCase()).KOR
          }
          isClicked={true}
        />
      </h3>
      <table>
        <tbody>
          <tr>
            <Th>가게 전화번호</Th>
            <Td>{phone}</Td>
          </tr>
          <tr>
            <Th>배달비</Th>
            <Td>{deliveryFee.toLocaleString()}원</Td>
          </tr>
          <tr>
            <Th>영업 시간</Th>
            <Td>{timeConveter(businessTime)}</Td>
          </tr>
          <tr>
            <Th isLastCell={true}>브레이크 타임</Th>
            <Td isLastCell={true}>
              {breakTime === "00-00" ? "없음" : timeConveter(breakTime)}
            </Td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

StoreInfo.propTypes = {
  storeName: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  deliveryFee: PropTypes.number.isRequired,
  businessTime: PropTypes.string.isRequired,
  breakTime: PropTypes.string.isRequired,
};
export default StoreInfo;

const Th = styled.th`
  padding: 8px;
  border-right: 1px solid ${COLOR.DARKER_GRAY};
  border-bottom: ${({ isLastCell }) =>
    isLastCell ? "none" : `1px solid ${COLOR.DARKER_GRAY}`};
`;

const Td = styled.td`
  border-bottom: ${({ isLastCell }) =>
    isLastCell ? "none" : `1px solid ${COLOR.DARKER_GRAY}`};
  width: 200px;
  text-align: center;
`;
