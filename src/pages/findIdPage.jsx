import React from "react";
import { useNavigate } from "react-router-dom";
import { PageWrapper, FindPageHeader } from "../component/style/findPageStyle";
import { useState } from "react";
import FindIdForm from "../component/find/findIdForm";
import axios from "axios";
import ShowId from "../component/find/showId";
import styled from "styled-components";
const FindIdPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
  });
  const { name, phone } = inputs;

  const onNameChange = (e) => {
    const val = e.target.value;
    setInputs((cur) => ({ ...cur, name: val }));
  };
  const onPhoneChange = (e) => {
    const val = e.target.value;
    setInputs((cur) => ({ ...cur, phone: val }));
  };
  const onIdClick = () => {
    navigate("/find/id");
  };
  const onPwClick = () => {
    navigate("/find/pw");
  };
  const findId = async () => {
    console.log(name, phone);
    await axios
      .post("http://localhost:8080/user/find/email", {
        name,
        phone,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          const foundId = res.data;
          setEmail(foundId);
          console.log(foundId);
        }
      })
      .catch((e) => {
        console.log(e);
        const errorKey = e.response.data.errorCode;
        setInputs({
          name: "",
          phone: "",
        });
        setEmail("");
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
      {!email ? (
        <FindIdForm
          name={name}
          phone={phone}
          onNameChange={onNameChange}
          onPhoneChange={onPhoneChange}
          findId={findId}
        />
      ) : (
        <ShowId email={email.email} />
      )}
    </PageWrapper>
  );
};

export default FindIdPage;

const TabWrapper = styled.div`
  cursor: pointer;
`;
