import React from "react";
import { useNavigate } from "react-router-dom";
import { PageWrapper, FindPageHeader } from "../component/style/findPageStyle";
import { useState } from "react";
import axios from "axios";
import FindPwForm from "../component/find/findPwForm";
import ShowPw from "../component/find/showPw";
import styled from "styled-components";
const FindPwPage = (props) => {
  const navigate = useNavigate();
  const [tempPw, setTempPw] = useState("");
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    phone: "",
  });
  const { email, name, phone } = inputs;
  const onEmailChange = (e) => {
    const val = e.target.value;
    //
    setInputs((cur) => ({ ...cur, email: val }));
  };
  const onNameChange = (e) => {
    const val = e.target.value;
    //
    setInputs((cur) => ({ ...cur, name: val }));
  };
  const onPhoneChange = (e) => {
    const val = e.target.value;
    //
    setInputs((cur) => ({ ...cur, phone: val }));
  };
  const onIdClick = () => {
    navigate("/find/id");
  };
  const onPwClick = () => {
    navigate("/find/pw");
  };
  const checkInputs = () => {};
  const findPw = async () => {
    await axios
      .post("http://localhost:8080/user/find/password", {
        email,
        name,
        phone,
      })
      .then((res) => {
        if (res.status === 200) {
          setTempPw(res.data.tempPassword);
          console.log(tempPw);
        }
      })
      .catch((e) => {
        const errorKey = e.response.data.errorCode;
        setInputs({ email: "", name: "", phone: "" });
        setTempPw("");
        switch (errorKey) {
          case "U006":
            alert(e.response.data.message);
            break;
          default:
            alert("예상하지 못한 에러가 발생했습니다");
        }
      });
  };
  return (
    <PageWrapper>
      <h1>아이디 / 비밀번호 찾기</h1>
      <FindPageHeader>
        <TabWrapper onClick={onIdClick}>이메일 찾기</TabWrapper>
        <TabWrapper onClick={onPwClick}>비밀번호 찾기</TabWrapper>
      </FindPageHeader>
      {!tempPw ? (
        <FindPwForm
          email={email}
          name={name}
          phone={phone}
          onEmailChange={onEmailChange}
          onNameChange={onNameChange}
          onPhoneChange={onPhoneChange}
          findPw={findPw}
        />
      ) : (
        <ShowPw pw={tempPw} />
      )}
    </PageWrapper>
  );
};

export default FindPwPage;

const TabWrapper = styled.div`
  cursor: pointer;
`;
