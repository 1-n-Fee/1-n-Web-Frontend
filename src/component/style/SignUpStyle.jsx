import styled from "styled-components";
import { COLOR } from "../../constants/colors";

export const SignUpSelectStyle = styled.select`
  display: inline-block;
  width: ${({ width }) => (width === undefined ? "100px" : width)};
  border: none;
  outline: none;
  border-bottom: 1px solid ${COLOR.DARKER_GRAY};
  height: 30px;
  padding: 0 3px;
  font-size: ${({ fontSize }) => (fontSize === undefined ? "16px" : fontSize)};
`;

export const SignUpInputStyle = styled.input`
  display: inline-block;
  width: ${({ width }) => (width === undefined ? "280px" : width)};
  border: none;
  outline: none;
  border-bottom: 1px solid ${COLOR.DARKER_GRAY};
  height: 30px;
  padding: 0 6px;
  font-size: 16px;
`;

export const SignUpWarningStyle = styled.span`
  display: inline-block;
  color: ${COLOR.DARKER_GRAY};
  font-size: 12px;
  padding: 4px;
`;

export const SignUpCheckBtnStyle = styled.button`
  margin: 0 5px;
  height: 30px;
  border-radius: 6px;
  font-weight: 600;
  background-color: ${COLOR.WHITE};
  color: ${COLOR.NAVY};
  &:hover:enabled {
    background-color: ${COLOR.RED_PINK};
    color: ${COLOR.NAVY};
  }
  &:enabled {
    border: 2px solid ${COLOR.RED_PINK};
  }
`;

export const SubmitBtn = styled.button`
  width: ${({ width }) => (width !== undefined ? width : "560px")};
  height: 50px;
  margin: 18px 0 10px 0;
  text-align: center;
  font-weight: 600;
  color: ${COLOR.WHITE};
  border-radius: 9px;
  font-size: 16px;
  background-color: ${COLOR.RED_PINK};
  &:hover {
    background-color: ${COLOR.DARK_RED};
  }
`;

// input 모아놓은 컴포넌트의 가장 바깥 div
export const SignUpInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
`;

// input에 해당하는 이름. ex) 전화번호
export const Title = styled.h4`
  display: inline-block;
  width: 200px;
  margin: 0 20px 0 0;
`;

// title과 input을 감싸는 컴포넌트
export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 0px;
  margin: 20px 0px;
  height: ${({ height }) => (height === undefined ? "50px" : height)};
`;

// signUp 페이지 전체를 감싸는 컴포넌트
export const SignUpPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px auto;
  width: 600px;
`;

// 회원가입 페이지 제목
export const H2 = styled.h2`
  margin: 10px 0 27px 0;
`;

// 회원가입 페이지 상단에 있는 설명 : *표시는 필수입력
export const SignUpPageExplainSpan = styled.span`
  display: block;
  font-size: 13px;
  color: ${COLOR.DARKER_GRAY};
  text-align: right;
  margin: 10px 3px;
  width: 100%;
`;
