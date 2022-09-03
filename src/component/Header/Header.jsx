import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Icons from "./Icons";
import SearchBar from "../common/SearchBar";
import Tag from "../common/Tag";
import { COLOR } from "./../../constants/colors";

const Header = () => {
  const navigate = useNavigate();
  const [tagData, setTagData] = useState([
    { name: "한식", isClicked: true },
    { name: "양식", isClicked: true },
    { name: "중식", isClicked: true },
    { name: "일식", isClicked: true },
    { name: "야식", isClicked: true },
    { name: "기타", isClicked: true },
  ]);

  const onLogoClick = () => {
    navigate("/");
  };
  const onTagClick = (e) => {
    const idx = parseInt(e.target.dataset.key);
    setTagData((cur) =>
      cur.map((d, key) => (key === idx ? { ...d, isClicked: !d.isClicked } : d))
    );
  };

  const onSearch = (keyword) => {
    // keyword 서버로 넘겨주기
  };

  return (
    <div>
      <HeaderWrapper isHome={window.location.pathname === "/"}>
        <ImgWrapper onClick={onLogoClick}>
          <img src="/logo.png" width="160px" alt="logo" />
        </ImgWrapper>

        {window.location.pathname === "/" ? (
          <SearchBarWrapper>
            <SearchBar onSearchListener={onSearch} />

            <div>
              {tagData.map((data, key) => (
                <Tag
                  title={data.name}
                  isClicked={data.isClicked}
                  dataKey={key}
                  key={key}
                  onClick={onTagClick}
                />
              ))}
            </div>
          </SearchBarWrapper>
        ) : null}

        <Icons />
      </HeaderWrapper>
    </div>
  );
};

export default Header;

const ImgWrapper = styled.div`
  width: 20%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  background-color: white;
  border-radius: 10px;
  margin: 3px 0;
  &:hover {
    cursor: pointer;
  }
`;

const HeaderWrapper = styled.div`
  padding: 15px 30px;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  position: ${({ isHome }) => (isHome ? "fixed" : "static")};
  top: 0;
  width: 100vw;
  background-color: ${COLOR.HEADER_BG};
  z-index: 97;
  height: 120px;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
