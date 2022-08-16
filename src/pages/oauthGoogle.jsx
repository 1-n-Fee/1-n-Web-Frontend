import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import oauthDataAtom from "./../recoil/oauthData/atom";
const OauthGoogle = (props) => {
  const navigate = useNavigate();
  const setAuthCode = useSetRecoilState(oauthDataAtom);

  let code = new URL(window.location.href).searchParams.get("code");
  //const auth = localStorage.getItem("user");
  useEffect(() => {
    console.log(`코드:${code}`);
    const fetchId = async () => {
      try {
        await axios
          .get(`http://localhost:8080/auth/google?code=${code}`)
          .then((res) => {
            console.log("before split");
            const a = res.data.split("\n");
            console.log(a);
            if (a[0] === "구글 회원가입이 되어 있지 않은 회원입니다.") {
              const b = a[1].split("=");
              const id = b[1];
              console.log(id);

              // axios
              //   .post(`http://localhost:8080/signup`, {
              //     name: "홍길동",
              //     role: "admin",
              //     accountType: "google",
              //     oauthId: id,
              //   })
              //   .then((res) => console.log(res))
              //   .then(navigate("/"))
              //   .catch((error) => console.log(error));
            } else {
              console.log(res, res.headers);
              const auth = res.headers.authorization;
              console.log(auth);
              localStorage.setItem("Authorization", auth);
              navigate("/");
            }
          });
      } catch (e) {
        alert("가입되어있지 않은 회원입니다. 회원가입 페이지로 이동합니다.");
        console.log(e.response);
        setAuthCode(code);
        navigate("/signup/oauth/google");
        // navigate("/login");
      }
    };
    fetchId();
  }, []);
  return <h1>Waiting for GOOGLE Authorization...</h1>;
};

export default OauthGoogle;
