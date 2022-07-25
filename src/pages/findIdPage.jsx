import React from "react";
import { useNavigate } from "react-router-dom";
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
    navigate("/find-id");
  };
  const onPwClick = () => {
    navigate("/find-pw");
  };
  const findId = () => {
    // TODO: 서버와 통신
  };
  return (
    <>
      <h1>아이디 / 비밀번호 찾기</h1>
      <div>
        <span onClick={onIdClick}>아이디 찾기</span>
        <span onClick={onPwClick}>비밀번호 찾기</span>
      </div>
      <FindIdForm
        name={name}
        tel={tel}
        onNameChange={onNameChange}
        onTelChange={onTelChange}
        findId={findId}
      />
    </>
  );
};

export default FindIdPage;
