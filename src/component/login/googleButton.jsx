import React from "react";
import styled from "styled-components";
const GoogleButton = (props) => {
  return (
    <ButtonWrapper href="https://accounts.google.com/o/oauth2/v2/auth?client_id=63234602229-u49a73vg77uch12osuh9egbp6vmshsps.apps.googleusercontent.com&redirect_uri=http://localhost:3000/auth/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile">
      <ImgWrapper src="google_btn.png" />
    </ButtonWrapper>
  );
};

export default GoogleButton;

const ButtonWrapper = styled.a`
  margin: 5px;
`;
const ImgWrapper = styled.img`
  width: 12rem;
  height: auto;
`;
