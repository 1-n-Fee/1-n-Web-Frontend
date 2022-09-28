import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { TitleWrapper } from "../component/userInfo/accordionLayout";
import { useLocation, useNavigate } from "react-router-dom";
const NNameChange = (props) => {
  const navigate = useNavigate();
  const [nickName, setNickName] = useState("");
  const [isNickDupChecked, setIsNickDupChecked] = useState(false);
  const onChange = (e) => {
    const { value } = e.target;
    setNickName(value);
  };
  const dupCheck = async () => {
    // TODO: 서버에 새 nickname 전달하고 중복 여부 가져오기
    // if true -> 사용 가능
    // else -> 중복: 사용 불가 (alert vs popup vs text)
    setIsNickDupChecked(true);
  };
  const onSubmit = async () => {
    // TODO: 서버에 새 nickname 정보 전달
    // 성공하면 navigate('/user');
  };
  return (
    <div>
      <TitleWrapper>
        <div>닉네임</div>
        <div>
          <FontAwesomeIcon
            icon={solid("chevron-left")}
            onClick={() => {
              navigate("/user");
            }}
          />
        </div>
      </TitleWrapper>
      <span>
        닉네임은 8자 이상 15자 이하의 영문자, 숫자, 특수분자가 조합되어야
        합니다.
      </span>
      <div>
        <input type="text" placeholder="닉네임" onChange={onChange} />
        <button onClick={dupCheck}>중복 검사</button>
      </div>
      <button onClick={() => navigate("/user")}>취소</button>
      <button onClick={onSubmit}>저장</button>
    </div>
  );
};

export default NNameChange;
