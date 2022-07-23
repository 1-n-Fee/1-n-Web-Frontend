import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AlarmMenu from "./AlarmMenu";
import Icon from "./Icon";
import MyPageMenu from "./MyPageMenu";

const Key = { ALARM: "alarm", MY_PAGE: "myPage" };
Object.freeze(Key);

const Icons = () => {
  const navigate = useNavigate();
  const [isMenuOpened, setIsMenuOpened] = useState({
    [Key.ALARM]: false,
    [Key.MY_PAGE]: false,
  });
  const onAddRoomClick = () => {
    navigate("creating-room");
  };
  const onChatRoomClick = () => {
    navigate("chat");
  };
  const onAlarmMenuClick = useCallback(() => {
    console.log("isAlarmClicked");
    setIsMenuOpened((cur) => ({
      [Key.ALARM]: !cur[Key.ALARM],
      [Key.MY_PAGE]: false,
    }));
  }, []);
  const onMyPageMenuClick = useCallback(() => {
    setIsMenuOpened((cur) => ({
      [Key.ALARM]: false,
      [Key.MY_PAGE]: !cur[Key.MY_PAGE],
    }));
  }, []);

  //   useEffect(() => {
  //     console.log(isMenuOpened);
  //   }, [isMenuOpened]);

  return (
    <IconsWrapper>
      <Icon emoji={"➕"} onClick={onAddRoomClick} />
      <Icon emoji={"💬"} onClick={onChatRoomClick} />
      <Icon emoji={"🔔"} onClick={onAlarmMenuClick} />
      <Icon emoji={"😀"} onClick={onMyPageMenuClick} />
      {isMenuOpened[Key.ALARM] && <AlarmMenu />}
      {isMenuOpened[Key.MY_PAGE] && <MyPageMenu />}
    </IconsWrapper>
  );
};

export default Icons;

const IconsWrapper = styled.div`
  position: relative;
  margin: auto 5px;
`;
