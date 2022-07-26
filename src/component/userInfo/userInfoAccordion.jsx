import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import AccordionLayout from "./accordionLayout";

const UserInfoAccordion = (props) => {
  const [activeIndex, setActiveIndex] = useState();
  const [pwType, setPwType] = useState({
    type: "password",
    visible: false,
  });
  const [gender, setGender] = useState("공개 안 함");
  const handleChange = (e) => {
    const { value } = e.target;
    setGender(value);
  };
  const switchPwType = () => {
    setPwType(() => {
      return !pwType.visible
        ? { type: "text", visible: true }
        : { type: "password", visible: false };
    });
  };
  const genderList = ["남성", "여성", "공개 안 함"];
  return (
    <PageWrapper>
      <AccordionWrapper>
        <AccordionLayout
          title="닉네임"
          index={1}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        >
          <NameContainer>
            <div>
              <SubTitle>닉네임</SubTitle>
              <NickNameWrapper>
                <span>닉네임 정보</span>
                <div>
                  <FontAwesomeIcon icon={solid("pencil")} />
                </div>
              </NickNameWrapper>
            </div>
            <div>
              <SubTitle>이름</SubTitle>
              <NameWrapper>
                <span>이름 정보</span>
              </NameWrapper>
            </div>
          </NameContainer>
          <div>
            <ButtonWrapper>취소</ButtonWrapper>
            <ButtonWrapper>저장</ButtonWrapper>
          </div>
        </AccordionLayout>
        <AccordionLayout
          title="비밀번호"
          index={2}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        >
          <div>
            <SubTitle>비밀번호</SubTitle>
            <div>
              <input type={pwType.type} value="asdf@" disabled />
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
            <ButtonWrapper>비밀번호 변경</ButtonWrapper>
          </ButtonContainer>
        </AccordionLayout>

        <AccordionLayout
          title="학과"
          index={3}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        >
          <div>
            <div>
              <SubTitle>학과</SubTitle>
              <select>
                <option value="">학과</option>
              </select>
              {/*TODO: 회원가입 페이지 select box 가져오기*/}
            </div>
          </div>
          <div>
            <ButtonWrapper>취소</ButtonWrapper>
            <ButtonWrapper>저장</ButtonWrapper>
          </div>
        </AccordionLayout>

        <AccordionLayout
          title="성별"
          index={4}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        >
          <div>
            <div>
              <SubTitle>성별</SubTitle>
              <ul>
                {genderList.map((item, index) => (
                  <li>
                    <input
                      type="radio"
                      name="gender"
                      value={item}
                      checked={gender === item}
                      onChange={handleChange}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <ButtonWrapper>취소</ButtonWrapper>
            <ButtonWrapper>저장</ButtonWrapper>
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
