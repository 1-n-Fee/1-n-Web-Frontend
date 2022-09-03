import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import oauthDataAtom from "./../recoil/oauthData/atom";
import ROLE from "./../constants/role";
import loginAndRoleDataAtom from "../recoil/loginAndRole/atom";

const OauthGoogle = (props) => {
  const navigate = useNavigate();
  const setLoginRoleData = useSetRecoilState(loginAndRoleDataAtom);
  const setAuthCode = useSetRecoilState(oauthDataAtom);

  let code = new URL(window.location.href).searchParams.get("code");
  //const auth = localStorage.getItem("user");
  useEffect(() => {
    // console.log(`코드:${code}`);

    if (localStorage.getItem("isSignUp") === "true") {
      setAuthCode(code);
      localStorage.setItem("isSignUp", "false");
      alert(
        "구글 계정이 확인되었습니다. \n필수정보를 모두 입력해야 구글 계정으로 회원가입됩니다."
      );
      navigate("/signup/oauth/google");
      return;
    }
    const fetchId = async () => {
      try {
        await axios
          .get(`http://localhost:8080/user/oauth/google?code=${code}`)
          .then((res) => {
            console.log(res);
            localStorage.setItem("Authorization", res.headers.authorization);
            alert("로그인에 성공했습니다");
            setLoginRoleData({ isLogin: true, role: ROLE.STUDENT });
            navigate("/");
          });
      } catch (e) {
        const errorKey = e.response.data.errorCode;
        console.log(e);

        setAuthCode(code);
        switch (errorKey) {
          case "U006":
            alert(
              "가입되어있지 않은 회원입니다. 회원가입 페이지로 이동합니다."
            );
            navigate("/before-signup");
            break;
          default:
        }
        // navigate("/login");
      }
    };
    fetchId();
  }, []);
  return <h1>Waiting for GOOGLE Authorization...</h1>;
};

export default OauthGoogle;
