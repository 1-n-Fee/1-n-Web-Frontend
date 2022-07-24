import React, { useCallback } from "react";
import styled from "styled-components";

const AlarmDelBtn = ({ id }) => {
  const onDelete = useCallback(() => {
    // alarm의 id를 이용하여 삭제요청 보내기
  }, []);
  return <DelBtn onClick={onDelete}>❌</DelBtn>;
};

export default AlarmDelBtn;

const DelBtn = styled.button`
  display: inline-block;
  background-color: transparent;
  &:hover {
    background-color: transparent;
  }
`;
