import React from "react";
import { FOOD_CATEGORY } from "../../../constants/arrays";
import Tag from "../../common/Tag";
import PropTypes from "prop-types";

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
    <div>
      <h3>
        {storeName}
        <Tag title={FOOD_CATEGORY.find((c) => c.ENG === category).KOR} />
      </h3>
      <table>
        <tbody>
          <tr>
            <th>가게 전화번호</th>
            <td>{phone}</td>
          </tr>
          <tr>
            <th>배달비</th>
            <td>{deliveryFee.toLocaleString()}</td>
          </tr>
          <tr>
            <th>영업 시간</th>
            <td>{timeConveter(businessTime)}</td>
          </tr>
          <tr>
            <th>브레이크 타임</th>
            <td>{breakTime === "00-00" ? "없음" : timeConveter(breakTime)}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
