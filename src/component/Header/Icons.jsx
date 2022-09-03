import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AlarmMenu from "./AlarmMenu";
import Icon from "./Icon";
import MyPageMenu from "./MyPageMenu";
// import authTokenDataAtom from "./../../recoil/authToken/atom";
import { useRecoilState } from "recoil";
import axios from "axios";
import loginAndRoleDataAtom from "./../../recoil/loginAndRole/atom";
import isMenuOpenAtom from "./../../recoil/menu/atom";
const Key = { ALARM: "alarm", MY_PAGE: "myPage" };
Object.freeze(Key);

const Icons = () => {
  const navigate = useNavigate();
  // const [authToken, setAuthToken] = useRecoilState(authTokenDataAtom);
  const [loginData, setLoginData] = useRecoilState(loginAndRoleDataAtom);
  // const [isMenuOpened, setIsMenuOpened] = useState({
  //   [Key.ALARM]: false,
  //   [Key.MY_PAGE]: false,
  // });
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(isMenuOpenAtom);

  const onAddRoomClick = () => {
    navigate("creating-room");
  };
  const onChatRoomClick = () => {
    navigate("chat");
  };
  // const onAlarmMenuClick = useCallback(() => {
  //   console.log("isAlarmClicked");
  //   setIsMenuOpened((cur) => ({
  //     [Key.ALARM]: !cur[Key.ALARM],
  //     [Key.MY_PAGE]: false,
  //   }));
  // }, []);
  const onMyPageMenuClick = useCallback((e) => {
    // setIsMenuOpened((cur) => ({
    //   [Key.ALARM]: false,
    //   [Key.MY_PAGE]: !cur[Key.MY_PAGE],
    // }));
    setIsMenuOpen((cur) => ({ ...cur, myPage: !cur.myPage }));
    e.stopPropagation();
    console.log(e.currentTarget.id);
  }, []);

  const onLoginClick = () => {
    navigate("/login");
  };
  // 로그인여부 검사
  useEffect(() => {
    checkIsLogin();
  }, []);

  const checkIsLogin = async () => {
    try {
      const token = window.localStorage.getItem("Authorization");
      console.log(token); // Bearer ~~~
      const response = await axios.get("http://localhost:8080/user/isLogin", {
        headers: { Authorization: token },
      });
      const { isLogin, role } = response.data;
      setLoginData({ isLogin: isLogin, role: role });
    } catch (err) {
      console.log(err);
      alert("서버 오류가 발생했습니다.");
    }
  };
  //   useEffect(() => {
  //     console.log(isMenuOpened);
  //   }, [isMenuOpened]);

  return (
    <IconsWrapper>
      <Icon emoji={"➕"} onClick={onAddRoomClick} />
      <Icon emoji={"💬"} onClick={onChatRoomClick} />
      {/* <Icon emoji={"🔔"} onClick={onAlarmMenuClick} /> */}
      {loginData.isLogin ? (
        <Icon emoji={"😀"} onClick={onMyPageMenuClick} />
      ) : (
        <Icon emoji={"LOGIN"} onClick={onLoginClick} fontSize={"15px"} />
      )}
      {/* {isMenuOpened[Key.ALARM] && <AlarmMenu />} */}
      {isMenuOpen.myPage && <MyPageMenu isLogin={loginData.isLogin} />}
    </IconsWrapper>
  );
};

export default Icons;

const IconsWrapper = styled.div`
  position: relative;
  margin: auto 5px;
`;
