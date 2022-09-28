import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { COLOR } from "../../../constants/colors";
import Underline from "../../common/Underline";
import { historyDataAtom } from "./../../../recoil/historyData/atom";

// 나의 주문을 보여주는 탭과 다른 사용자의 주문을 보여주는 pop up 컴포넌트에 사용됩니다.
const HistoryOrderList = ({
  orderData,
  isPartySection = false,
  maxHeight = "210px",
}) => {
  const scrollRef = useRef();
  const historyData = useRecoilValue(historyDataAtom);
  const [orderList, setOrderList] = useState(
    isPartySection ? orderData : historyData.myOrder
  );
  useEffect(() => {
    if (scrollRef.current === undefined) return;
    scrollRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    if (isPartySection) {
      console.log(orderData);
      setOrderList(orderData);
    }
  }, [orderData]);

  return (
    <HistoryOrderListWrapper>
      <MenuTableWrapper maxHeight={maxHeight} ref={scrollRef}>
        <Table isPartySection={isPartySection}>
          <tbody>
            {/* 참여자 보여주는 tab에서 사용할 경우 orderData 출력 , 아닌 경우 본인의 data 출력 */}
            {(isPartySection ? orderData : historyData.myOrder).map(
              (o, key) => (
                <tr key={`order_${key}`}>
                  <Th>{o.foodName}</Th>
                  <Td>{o.price.toLocaleString()}원</Td>
                </tr>
              )
            )}
            <tr>
              <Th>
                <DeliveryFee>배달비</DeliveryFee>
              </Th>
              <Td>
                <DeliveryFee>
                  {historyData.feePerOne.toLocaleString()}원
                </DeliveryFee>
              </Td>
            </tr>
          </tbody>
        </Table>
      </MenuTableWrapper>
      <Underline thickness="2px" width={isPartySection ? "80%" : "100%"} />
      <TotalPrice>
        <Table>
          <tbody>
            <Tr>
              <Th>총 가격</Th>
              <Td>
                {(isPartySection
                  ? parseInt(
                      orderList.reduce((prev, cur) => prev + cur.price, 0)
                    ) + historyData.feePerOne
                  : historyData.totalFee
                ).toLocaleString()}
                원
              </Td>
            </Tr>
          </tbody>
        </Table>
      </TotalPrice>
    </HistoryOrderListWrapper>
  );
};

export default HistoryOrderList;

const HistoryOrderListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const MenuTableWrapper = styled.div`
  max-height: ${({ maxHeight }) => maxHeight};
  margin: 10px 0px;
  overflow: auto;
`;
const Table = styled.table`
  width: ${({ isPartySection }) => (isPartySection ? "350px" : "450px")};
  padding: 5px 20px;
`;
const Th = styled.th`
  padding: 10px;
  width: 50%;
`;

const Td = styled.td`
  text-align: center;
  width: 50%;
`;
const Tr = styled.tr`
  border-top: 2px solid black;
`;

const TotalPrice = styled.div`
  font-size: 18px;
`;

const DeliveryFee = styled.span`
  color: ${COLOR.RED_PINK};
`;
