import React from "react";
import styled from "styled-components";

const Thumbnail = ({ imgUrl, hasHoverEffect = false }) => {
  return (
    <Img src={`http://localhost:8080/image/menu/${imgUrl}`} alt="썸네일" />
  );
};

export default Thumbnail;

const Img = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 4px;
  object-fit: cover;
  margin: 0 10px;
  &:hover {
    cursor: ${({ hasHoverEffect }) => (hasHoverEffect ? "pointer" : "default")};
  }
`;
