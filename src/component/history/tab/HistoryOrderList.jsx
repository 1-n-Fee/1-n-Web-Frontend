import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import historyDataAtom from "./../../../recoil/historyData/atom";

// 나의 주문을 보여주는 탭과 다른 사용자의 주문을 보여주는 pop up 컴포넌트에 사용됩니다.
const HistoryOrderList = ({ orderData, isPartySection = false }) => {
  const historyData = useRecoilValue(historyDataAtom);
  const [orderList, setOrderList] = useState(
    isPartySection ? orderData : historyData.myOrder
  );

  return (
    <div>
      <ul>
        {/* 참여자 보여주는 tab에서 사용할 경우 orderData 출력 , 아닌 경우 본인의 data 출력 */}
        {(isPartySection ? orderData : historyData.myOrder).map((o, key) => (
          <li key={`order_${key}`}>
            <strong>{o.foodName}</strong>
            <span>{o.price.toLocaleString()}원</span>
          </li>
        ))}
      </ul>
      <div>
        <strong>배달비</strong>
        <span>{historyData.feePerOne.toLocaleString()}원</span>
      </div>
      <hr />
      <div>
        <strong>총 가격</strong>
        <span>{historyData.totalFee.toLocaleString()}원</span>
      </div>
    </div>
  );
};

export default HistoryOrderList;
