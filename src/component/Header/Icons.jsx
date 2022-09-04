import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import AlarmMenu from "./AlarmMenu";
import Icon from "./Icon";
import MyPageMenu from "./MyPageMenu";
import { useRecoilState } from "recoil";
import axios from "axios";
import loginAndRoleDataAtom from "./../../recoil/loginAndRole/atom";
import isMenuOpenAtom from "./../../recoil/menu/atom";
const Key = { ALARM: "alarm", MY_PAGE: "myPage" };
Object.freeze(Key);

const Icons = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useRecoilState(loginAndRoleDataAtom);
  // const [isMenuOpened, setIsMenuOpened] = useState({
  //   [Key.ALARM]: false,
  //   [Key.MY_PAGE]: false,
  // });
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(isMenuOpenAtom);

  const onAddRoomClick = () => {
    goTo("/creating-room");
  };
  const onChatRoomClick = () => {
    goTo("/chat");
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
  }, []);

  const onLoginClick = () => {
    navigate("/login");
  };
  // 로그인여부 검사
  useEffect(() => {
    checkIsLogin();
  }, []);

  // 클릭한 메뉴 - 사용할 수 있는지 판단하는 함수
  const goTo = (url) => {
    checkIsLogin();

    console.log(loginData.isLogin);
    if (loginData.isLogin) {
      navigate(url);
      return;
    }

    // 비로그인
    const answer = window.confirm(
      "로그인 후 이용가능합니다. 로그인 하시겠습니까?"
    );
    console.log(answer);
    if (answer) {
      navigate("/login");
    }
    return;
  };

  const checkIsLogin = async () => {
    try {
      const token = window.localStorage.getItem("Authorization");
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
