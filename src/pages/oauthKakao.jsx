import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import oauthDataAtom from "./../recoil/oauthData/atom";

const OauthKakao = (props) => {
  const navigate = useNavigate();
  const setAuthCode = useSetRecoilState(oauthDataAtom);

  let code = new URL(window.location.href).searchParams.get("code");
  //const auth = localStorage.getItem("user");
  useEffect(() => {
    console.log(code);
    const fetchId = async () => {
      try {
        await axios
          .get(`http://localhost:8080/auth/kakao?code=${code}`)
          .then((res) => {
            const a = res.data.split("\n");
            console.log(a);
            if (a[0] === "카카오 회원가입이 되어 있지 않은 회원입니다.") {
              const b = a[1].split("=");
              const id = b[1];
              console.log(id);
              axios
                .post(`http://localhost:8080/signup`, {
                  name: "홍길동",
                  role: "admin",
                  accountType: "kakao",
                  oauthId: id,
                })
                .then((res) => console.log(res))
                .then(navigate("/"))
                .catch((error) => console.log(error));
            } else {
              console.log(res, res.headers);
              const auth = res.headers.authorization;
              console.log(auth);
              localStorage.setItem("Authorization", auth);
              navigate("/");
            }
          });
      } catch (e) {
        console.log(e.response);
        alert("가입되어있지 않은 회원입니다. 회원가입 페이지로 이동합니다.");
        // alert("로그인 실패");
        // navigate("/login");
        setAuthCode(code);
        navigate("/signup/oauth/kakao");
      }
    };
    fetchId();
  }, []);

  return <h1>Waiting for KAKAO Authorization...</h1>;
};

export default OauthKakao;