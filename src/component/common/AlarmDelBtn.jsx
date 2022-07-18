import React, { useCallback } from "react";

const AlarmDelBtn = ({ id }) => {
  const onDelete = useCallback(() => {
    // alarm의 id를 이용하여 삭제요청 보내기
  }, []);
  return <button onClick={onDelete}>❌</button>;
};

export default AlarmDelBtn;
