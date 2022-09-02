import React, { useState, useEffect } from "react";
import styled from "styled-components";
import EmailSelector from "./ownerSignUp/EmailSelector";
import axios from "axios";
import Loading from "../common/Loading";
import { useRecoilState } from "recoil";
import isLoadingAtom from "../../recoil/loading/atom";
import { COLOR } from "./../../constants/colors";
import {
  SignUpInputStyle,
  SignUpCheckBtnStyle,
  SignUpWarningStyle,
} from "./../style/SignUpStyle";

// 상태
/**
 * [상태]
 * 인증하기 버튼 아직 안누름
 * 인증하기 버튼 누름
 * - 중복
 * 인증번호 전송버튼 누름 
 * - 인증번호 틀림 
 * - 유효한 인증번호임 
 * 
//  */
// const STATE = {
//   BEFORE_CHECK_EMAIL: 0,

// }

const IS_EMAIL_AVAIL = {
  NOT_YET: 0,
  NOT_AVAIL: 1,
  AVAIL: 2,
};

Object.freeze(IS_EMAIL_AVAIL);

let timerId = null;

const IdInput = ({ idKey, authCheckKey, setData, isOwner = false }) => {
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useRecoilState(isLoadingAtom);
  const [emailAddress, setEmailAddress] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [authLeftSecond, setAuthLeftSecond] = useState(179);
  const [hasEmailBeenChecked, setHasEmailBeenChecked] = useState(false); // 체크 여부만
  const [isIdDup, setIsIdDup] = useState(false); // 중복 여부
  const [isAvailEmail, setIsAvailEmail] = useState(IS_EMAIL_AVAIL.NOT_YET); // 유효한 이메일 여부
  const [showAuthSection, setShowAuthSection] = useState(false);

  useEffect(() => {
    setData((curData) => ({
      ...curData,
      [idKey]: isOwner ? `${id}@${emailAddress}` : `${id}@konkuk.ac.kr`,
      [authCheckKey]: isAvailEmail === IS_EMAIL_AVAIL.AVAIL,
    }));
  }, [authCheckKey, id, idKey, isAvailEmail, setData, emailAddress, isOwner]);

  const onIdChange = (e) => {
    setId(e.target.value);
    setIsAvailEmail(IS_EMAIL_AVAIL.NOT_YET);
    setShowAuthSection(false);
    setIsIdDup(false);
    clearInterval(timerId);
  };

  const onAuthCodeChange = (e) => {
    let value = e.target.value;
    value = value.replace(/ /g, "");
    value = value.substr(0, 6);
    setAuthCode(value);
  };

  const onAuthReqClick = (e) => {
    // 서버에 데이터 보내기 전 예외처리
    if (id === "") {
      alert("이메일 앞부분을 입력해주세요!");
      return;
    }

    if (emailAddress === "" && isOwner) {
      alert("이메일 주소를 선택해주세요!");
      return;
    }

    sendCheckEmail();
  };

  // 인증 확인 이메일 전송
  const sendCheckEmail = async () => {
    setIsLoading(true);
    try {
      await axios.post("http://localhost:8080/email", {
        userEmail: isOwner ? `${id}@${emailAddress}` : `${id}@konkuk.ac.kr`,
      });

      setShowAuthSection(true);
      setAuthLeftSecond(180);
      setHasEmailBeenChecked(true);

      // 타이머 시작
      timerId = setInterval(countAuthCodeTimer, 1000);
    } catch (err) {
      console.log(err);
      setIsIdDup(true);
    } finally {
      setIsLoading(false);
    }
  };

  // 인증 코드 맞나 확인
  const sendAuthCode = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/email/certification",
        {
          userEmail: isOwner ? `${id}@${emailAddress}` : `${id}@konkuk.ac.kr`,
          code: authCode,
        }
      );

      console.log(authCode);
      console.log(response.data);
      const result = response.data.result;

      if (!result) {
        // 인증 통과 안했으면
        setIsAvailEmail(IS_EMAIL_AVAIL.NOT_AVAIL);
        return;
      }

      // 인증 통과했으면
      setIsAvailEmail(IS_EMAIL_AVAIL.AVAIL);
      setShowAuthSection(false); // 인증 section 안보여주기
    } catch (err) {
      console.log(err);
    }
  };

  const countAuthCodeTimer = () => {
    setAuthLeftSecond((cur) => cur - 1);
  };

  useEffect(() => {
    if (authLeftSecond === 0) clearInterval(timerId, 0);
  }, [authLeftSecond]);
  const stopAuthCodeTimer = () => {};

  return (
    <div>
      <SignUpInputStyle
        width={"130px"}
        type="text"
        onChange={onIdChange}
        value={id}
        disabled={isLoading}
      />
      <span>@</span>
      {isOwner ? (
        <EmailSelector setEmail={setEmailAddress} />
      ) : (
        <span>konkuk.ac.kr</span>
      )}

      <SignUpCheckBtnStyle
        onClick={onAuthReqClick}
        disabled={
          id.length === 0 ||
          isLoading ||
          showAuthSection ||
          isAvailEmail === IS_EMAIL_AVAIL.AVAIL
        }
      >
        인증하기
      </SignUpCheckBtnStyle>
      {isLoading && <span>Loading...</span>}

      <AuthCheckTextWrapper>
        {hasEmailBeenChecked &&
          (isIdDup ? (
            <SignUpWarningStyle>이미 가입된 이메일입니다😮</SignUpWarningStyle>
          ) : isAvailEmail === IS_EMAIL_AVAIL.AVAIL ? (
            <SignUpWarningStyle>인증 완료!✅</SignUpWarningStyle>
          ) : null)}
      </AuthCheckTextWrapper>

      {showAuthSection && (
        <AuthSection>
          <div>
            <SignUpWarningStyle>
              <strong>
                {id}
                {isOwner ? `@${emailAddress}` : "@konkuk.ac.kr"}
              </strong>
              로 인증 메일이 발송되었습니다.
            </SignUpWarningStyle>
          </div>
          <div>
            <SignUpWarningStyle>
              인증번호 6자리를 입력해주세요.
            </SignUpWarningStyle>
          </div>
          <AuthCodeWrapper>
            <AuthCodeInput
              width={"70px"}
              type="text"
              value={authCode}
              onChange={onAuthCodeChange}
              maxLength={6}
            />
            <SignUpCheckBtnStyle
              onClick={sendAuthCode}
              disabled={authCode.length !== 6}
            >
              전송하기
            </SignUpCheckBtnStyle>
            <SignUpWarningStyle>
              남은 시간{" "}
              <strong>{`0${parseInt(authLeftSecond / 60)}:${
                (authLeftSecond % 60).toString().length === 1 ? "0" : ""
              }${authLeftSecond % 60}`}</strong>
            </SignUpWarningStyle>
          </AuthCodeWrapper>
          {hasEmailBeenChecked && isAvailEmail === IS_EMAIL_AVAIL.NOT_AVAIL ? (
            <SignUpWarningStyle>
              <strong>⚠️ 올바른 인증번호가 아닙니다</strong>
            </SignUpWarningStyle>
          ) : null}
        </AuthSection>
      )}
    </div>
  );
};

export default IdInput;

const AuthCheckTextWrapper = styled.div``;

const AuthSection = styled.div`
  padding: 5px;
  background-color: #dbdbd0;
  opacity: 90%;
  border-radius: 4px;
  margin: 15px 0 0 0;
`;

const AuthCodeWrapper = styled.div`
  padding: 5px 4px 3px 4px;
`;

const AuthCodeInput = styled.input`
  width: 70px;
  background-color: ${COLOR.WHITE};
  border-radius: 5px;
  height: 28px;
  outline: none;
  border: none;
  font-size: 16px;
  text-align: center;
`;
