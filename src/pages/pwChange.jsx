import React, { useState } from "react";
import { TitleWrapper } from "../component/userInfo/accordionLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useNavigate } from "react-router-dom";
import NewPwInput from "../component/pwChange/newPwInput";
import DupPwInput from "../component/pwChange/dupPwInput";
import { Key } from "../component/signup/SignUpInputs";
const PwChange = (props) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    pw: "",
    isPwDupChecked: "",
  });
  const [newPw, setNewPw] = useState("");
  const [dupPw, setDupPw] = useState("");
  const [newPwType, setNewPwType] = useState({
    type: "password",
    visible: false,
  });
  const [dupPwType, setDupPwType] = useState({
    type: "password",
    visible: false,
  });

  const switchPwType = (pw, func) => {
    func(() => {
      return !pw.visible
        ? { type: "text", visible: true }
        : { type: "password", visible: false };
    });
  };

  const onSubmit = () => {
    // TODO: 서버에 비밀번호 전달
    // TODO: dup비밀번호와 일치 여부 판단 (signUp 컴포넌트 참고)
    console.log(inputs);
  };
  return (
    <div>
      <TitleWrapper>
        <div>비밀번호</div>
        <div>
          <FontAwesomeIcon
            icon={solid("chevron-left")}
            onClick={() => {
              navigate("/user");
            }}
          />
        </div>
      </TitleWrapper>
      <NewPwInput
        pwKey={Key.PW}
        setNewPw={setNewPw}
        newPwType={newPwType}
        setNewPwType={setNewPwType}
        switchPwType={switchPwType}
        setInputs={setInputs}
      />
      <div>
        <span>비밀번호 안정성:</span>
        <span>비밀번호 규칙입력 칸입니다</span>
      </div>
      <DupPwInput
        pw={newPw}
        setDupPw={setDupPw}
        dupPwType={dupPwType}
        setDupPwType={setDupPwType}
        setInputs={setInputs}
        dupCheckKey={Key.IS_PW_DUP_CHECKED}
        switchPwType={switchPwType}
      />
      <button onClick={() => navigate("/user")}>취소</button>
      <button onClick={onSubmit}>비밀번호 변경</button>
    </div>
  );
};

export default PwChange;
