import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import AccordionLayout from "./accordionLayout";
import { useNavigate } from "react-router-dom";
import MajorSelect from "../signup/MajorSelect";
import GenderRadioBtn from "../signup/GenderRadioBtn";
const UserInfoAccordion = ({ Key, data, setData, orgData }) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState();
  const [pwType, setPwType] = useState({
    type: "password",
    visible: false,
  });
  const switchPwType = () => {
    setPwType(() => {
      return !pwType.visible
        ? { type: "text", visible: true }
        : { type: "password", visible: false };
    });
  };
  const onCancel = () => {
    console.log("cancel");
    setData({ ...orgData });
    setActiveIndex();
  };
  const onSubmit = () => {
    console.log("submit");
    //서버에 바뀐 값을 전송
    // 200 OK 전달되면 클라이언트의 data와 orgData도 변경
    console.log(data);
    setData((cur) => ({ ...cur }));
  };
  const handleSetIndex = (index) => {
    activeIndex !== index ? setActiveIndex(index) : setActiveIndex();
  };
  return (
    <PageWrapper>
      <AccordionWrapper>
        <AccordionLayout
          title="닉네임"
          index={1}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          handleSetIndex={handleSetIndex}
        >
          <NameContainer>
            <div>
              <SubTitle>닉네임</SubTitle>
              <NickNameWrapper>
                <span>{data[Key.NICKNAME]}</span>
                <div onClick={() => navigate("/user/nickname")}>
                  <FontAwesomeIcon icon={solid("pencil")} />
                </div>
              </NickNameWrapper>
            </div>
            <div>
              <SubTitle>이름</SubTitle>
              <NameWrapper>
                <span>{data[Key.NAME]}</span>
              </NameWrapper>
            </div>
          </NameContainer>
        </AccordionLayout>
        <AccordionLayout
          title="비밀번호"
          index={2}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          handleSetIndex={handleSetIndex}
        >
          <div>
            <SubTitle>비밀번호</SubTitle>
            <div>
              <input type={pwType.type} value={data[Key.PW]} disabled />
              {pwType.visible ? (
                <FontAwesomeIcon icon={solid("eye")} onClick={switchPwType} />
              ) : (
                <FontAwesomeIcon
                  icon={solid("eye-slash")}
                  onClick={switchPwType}
                />
              )}
            </div>
          </div>
          <ButtonContainer>
            <ButtonWrapper onClick={() => navigate("/user/pw")}>
              비밀번호 변경
            </ButtonWrapper>
          </ButtonContainer>
        </AccordionLayout>

        <AccordionLayout
          title="학과"
          index={3}
          activeIndex={activeIndex}
          handleSetIndex={handleSetIndex}
        >
          <div>
            <div>
              <SubTitle>학과</SubTitle>
              <MajorSelect majorKey={Key.MAJOR} setData={setData} />
              {/*TODO: data에 저장된 major 값이 있으면 default로 해당 값 설정하기 : MajorSelect 컴포넌트 수정 필요*/}
            </div>
          </div>
          <div>
            <ButtonWrapper onClick={onCancel}>취소</ButtonWrapper>
            {/*값이 변하지 않으면 저장 버튼 비활성화*/}
            <ButtonWrapper onClick={onSubmit}>저장</ButtonWrapper>
          </div>
        </AccordionLayout>

        <AccordionLayout
          title="성별"
          index={4}
          activeIndex={activeIndex}
          handleSetIndex={handleSetIndex}
        >
          <div>
            <div>
              <SubTitle>성별</SubTitle>
              <ul>
                <GenderRadioBtn
                  genderKey={Key.GENDER}
                  genderData={Key.GENDER_DATA}
                  setData={setData}
                  data={data}
                />
              </ul>
            </div>
          </div>
          <div>
            <ButtonWrapper onClick={onCancel}>취소</ButtonWrapper>
            <ButtonWrapper onClick={onSubmit}>저장</ButtonWrapper>
          </div>
        </AccordionLayout>
      </AccordionWrapper>
    </PageWrapper>
  );
};

// TODO: Button은 닉네임 수정 페이지(or 컴포넌트)에서 진행, 아코디언에서는 보여지지 않음

export default UserInfoAccordion;

const AccordionWrapper = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
`;
const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;
const ButtonWrapper = styled.button`
  margin-right: 10px;
`;
const ButtonContainer = styled.div``;
const NameWrapper = styled.div`
  border-bottom: solid rgba(1, 1, 1, 0.2);
`;

const NickNameWrapper = styled(NameWrapper)`
  display: flex;
  justify-content: space-between;
`;
const SubTitle = styled.span`
  font-size: 0.7rem;
`;
const NameContainer = styled.div``;
