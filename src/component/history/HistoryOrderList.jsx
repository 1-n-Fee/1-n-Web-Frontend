import React, { useEffect, useState } from "react";

const HistoryOrderList = () => {
  const [orderList, setOrderList] = useState([
    { foodName: "참치 김밥", price: 3500 },
    { foodName: "우동", price: 6000 },
    { foodName: "돈까스", price: 9000 },
    { foodName: "주먹밥", price: 3000 },
  ]);
  const [deliveryFee, setDeliveryFee] = useState(1500);
  const [totalFee, setTotalFee] = useState(0);

  useEffect(() => {
    const totalFoodPrice = orderList.reduce(
      (prevSum, curValue) => prevSum + curValue.price,
      0
    );

    setTotalFee(totalFoodPrice + deliveryFee);
  }, [orderList, deliveryFee]);

  return (
    <div>
      <ul>
        {orderList.map((o, key) => (
          <li>
            <strong>{o.foodName}</strong>
            <span>{o.price.toLocaleString()}원</span>
          </li>
        ))}
      </ul>
      <div>
        <strong>배달비</strong>
        <span>{deliveryFee.toLocaleString()}원</span>
      </div>
      <hr />
      <div>
        <strong>총 가격</strong>
        <span>{totalFee.toLocaleString()}원</span>
      </div>
    </div>
  );
};

export default HistoryOrderList;
