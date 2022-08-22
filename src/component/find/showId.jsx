import React from "react";
import styled from "styled-components";

const ShowId = ({ email }) => {
  return (
    email && (
      <DivWrapper>
        <img src="/check.png" alt="check" width="80px" />
        <TextWrapper>
          <div>회원님의 이메일은</div>
          <div>
            <EmailWrapper>{email}</EmailWrapper>
            <span>입니다.</span>
          </div>
        </TextWrapper>
      </DivWrapper>
    )
  );
};

export default ShowId;

const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
const TextWrapper = styled.div`
  text-align: center;
`;
const EmailWrapper = styled.span`
  color: #6558f5;
  font-weight: 700;
`;
