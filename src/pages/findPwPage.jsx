import React from "react";
import { useNavigate } from "react-router-dom";
import { PageWrapper, FindPageHeader } from "../component/style/findPageStyle";
import { useState } from "react";
import FindPwForm from "../component/find/findPwForm";

const FindPwPage = (props) => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const onIdChange = (e) => {
    const val = e.target.value;
    //
    setId(val);
  };
  const onNameChange = (e) => {
    const val = e.target.value;
    //
    setName(val);
  };
  const onTelChange = (e) => {
    const val = e.target.value;
    //
    setTel(val);
  };
  const onIdClick = () => {
    navigate("/find-id");
  };
  const onPwClick = () => {
    navigate("/find-pw");
  };
  const findPw = () => {
    // TODO: 서버와 통신
  };
  return (
    <PageWrapper>
      <h1>아이디 / 비밀번호 찾기</h1>
      <FindPageHeader>
        <span onClick={onIdClick}>아이디 찾기</span>
        <span onClick={onPwClick}>비밀번호 찾기</span>
      </FindPageHeader>
      <FindPwForm
        id={id}
        name={name}
        tel={tel}
        onIdChange={onIdChange}
        onNameChange={onNameChange}
        onTelChange={onTelChange}
        findPw={findPw}
      />
    </PageWrapper>
  );
};

export default FindPwPage;
