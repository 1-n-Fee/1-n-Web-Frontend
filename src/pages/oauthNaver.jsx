import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import oauthDataAtom from "./../recoil/oauthData/atom";
import loginAndRoleDataAtom from "../recoil/loginAndRole/atom";
import ROLE from "../constants/role";

const OauthNaver = (props) => {
  const navigate = useNavigate();
  const setLoginRoleData = useSetRecoilState(loginAndRoleDataAtom);
  const setAuthCode = useSetRecoilState(oauthDataAtom);

  let code = new URL(window.location.href).searchParams.get("code");
  //let state = new URL(window.location.href).searchParams.get("state");
  //const auth = localStorage.getItem("user");

  useEffect(() => {
    console.log(code);
    const fetchId = async () => {
      try {
        await axios
          .get(`http://localhost:8080/user/oauth/naver?code=${code}`)
          //.get(`http://localhost:8080/user/oauth/naver?code=${code}&state=1234`)
          .then((res) => {
            console.log(res);
            localStorage.setItem("Authorization", res.headers.authorization);
            alert("로그인에 성공했습니다");
            setLoginRoleData({ isLogin: true, role: ROLE.STUDENT });
            navigate("/");
          });
      } catch (e) {
        const errorKey = e.response.data.errorCode;

        setAuthCode(code);
        switch (errorKey) {
          case "U006":
            alert(
              "가입되어있지 않은 회원입니다. 회원가입 페이지로 이동합니다."
            );
            console.log(e.response);
            break;
          default:
        }
        navigate("/signup/oauth/naver");
        // alert("로그인 실패");
        // navigate("/login");
      }
    };
    fetchId();
  }, []);

  return <h1>Waiting for NAVER Authorization...</h1>;
};

export default OauthNaver;
