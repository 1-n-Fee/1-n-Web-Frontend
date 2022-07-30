import React, { useState } from "react";
import { TitleWrapper } from "../component/userInfo/accordionLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useNavigate } from "react-router-dom";

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
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const switchPwType = (pw, func) => {
    func(() => {
      return !pw.visible
        ? { type: "text", visible: true }
        : { type: "password", visible: false };
    });
  };

  const onSubmit = () => {
    // TODO: 서버에 비밀번호 전달
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
      <span>새 비밀번호</span>
      <input type={newPwType.type} name="newPw" onChange={onChange} />
      {newPwType.visible ? (
        <FontAwesomeIcon
          icon={solid("eye")}
          onClick={() => switchPwType(newPwType, setNewPwType)}
        />
      ) : (
        <FontAwesomeIcon
          icon={solid("eye-slash")}
          onClick={() => switchPwType(newPwType, setNewPwType)}
        />
      )}
      <div>
        <span>비밀번호 안정성:</span>
        <span>비밀번호 규칙입력 칸입니다</span>
      </div>
      <span>새 비밀번호 확인</span>
      <input type={dupPwType.type} name="dupPw" onChange={onChange} />
      {dupPwType.visible ? (
        <FontAwesomeIcon
          icon={solid("eye")}
          onClick={() => switchPwType(dupPwType, setDupPwType)}
        />
      ) : (
        <FontAwesomeIcon
          icon={solid("eye-slash")}
          onClick={() => switchPwType(dupPwType, setDupPwType)}
        />
      )}
      <button onClick={() => navigate("/user")}>취소</button>
      <button onClick={onSubmit}>비밀번호 변경</button>
    </div>
  );
};

export default PwChange;
