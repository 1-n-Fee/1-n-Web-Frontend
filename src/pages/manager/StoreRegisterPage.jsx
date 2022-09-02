import React from "react";
import styled from "styled-components";
import RegisterInputs from "../../component/manager/storeRegister/RegisterInputs";
import Underline from "./../../component/common/Underline";

const StoreRegisterPage = () => {
  return (
    <StoreRegisterPageWrapper>
      <H2>가게 등록하기</H2>
      <Underline width={"700px"} />
      <RegisterInputs />
    </StoreRegisterPageWrapper>
  );
};

export default StoreRegisterPage;

const StoreRegisterPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0 0 0;
`;

const H2 = styled.h2`
  padding: 0 0 10px 0;
`;
