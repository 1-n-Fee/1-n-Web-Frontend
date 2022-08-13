import React from "react";
import styled from "styled-components";
const NaverButton = (props) => {
  return (
    <ButtonWrapper href="https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=uD5deNWJiPwEgGJY2FO7&redirect_uri=http://localhost:3000/auth/naver&state=1234">
      <ImgWrapper src="naver_btn.png" />
    </ButtonWrapper>
  );
};

export default NaverButton;

const ButtonWrapper = styled.a`
  margin: 5px;
`;
const ImgWrapper = styled.img`
  width: 11.5rem;
  height: auto;
`;
