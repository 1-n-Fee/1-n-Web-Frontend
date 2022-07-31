import React from "react";
import { useNavigate } from "react-router-dom";
import { PageWrapper, FindPageHeader } from "../component/style/findPageStyle";
import { useState } from "react";
import FindIdForm from "../component/find/findIdForm";

const FindIdPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
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
    navigate("/find/id");
  };
  const onPwClick = () => {
    navigate("/find/pw");
  };
  const findId = () => {
    // TODO: 서버와 통신
  };
  return (
    <PageWrapper>
      <h1>아이디 / 비밀번호 찾기</h1>
      <FindPageHeader>
        <span onClick={onIdClick}>아이디 찾기</span>
        <span onClick={onPwClick}>비밀번호 찾기</span>
      </FindPageHeader>
      <FindIdForm
        name={name}
        tel={tel}
        onNameChange={onNameChange}
        onTelChange={onTelChange}
        findId={findId}
      />
    </PageWrapper>
  );
};

export default FindIdPage;
