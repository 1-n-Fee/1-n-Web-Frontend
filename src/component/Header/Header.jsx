import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Icons from "./Icons";
import SearchBar from "../common/SearchBar";
import Tag from "../common/Tag";
import { COLOR } from "./../../constants/colors";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { searchDetailAtom, searchResultAtom } from "../../recoil/search/atom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import SearchItem from "./SearchItem";
import SearchDetail from "./SearchDetail";
import {
  mealListEntryAtom,
  openIdAtom,
  originalMealListEntryAtom,
} from "../../recoil/meal/atom";
import { useEffect } from "react";
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
  const [searchResult, setSearchResult] = useRecoilState(searchResultAtom);
  const [searchDetail, setSearchDetail] = useRecoilState(searchDetailAtom);
  const [mealListEntry, setMealListEntry] = useRecoilState(mealListEntryAtom);
  const [originalMealListEntry, setOriginalMealListEntry] = useRecoilState(
    originalMealListEntryAtom
  );
  const openId = useRecoilValue(openIdAtom);
  let filter = [];
  const onLogoClick = () => {
    navigate("/");
  };
  const onTagClick = (e) => {
    const idx = parseInt(e.target.dataset.key);
    setTagData((cur) =>
      cur.map((d, key) => (key === idx ? { ...d, isClicked: !d.isClicked } : d))
    );
  };
  const filterCategory = () => {
    filter = tagData
      .map((tag) => {
        if (tag.isClicked) {
          switch (tag.name) {
            case "한식":
              return "KOREAN";
            case "양식":
              return "WESTERN";
            case "중식":
              return "CHINESE";
            case "일식":
              return "JAPANESE";
            case "야식":
              return "MIDNIGHT";
            case "기타":
              return "ETC";
            default:
          }
        }
      })
      .filter((val) => val !== undefined);
    console.log(filter);
  };

  const filterMealList = () => {
    if (mealListEntry) {
      setMealListEntry([...originalMealListEntry]);
      console.log(mealListEntry);

      setMealListEntry(
        mealListEntry.filter((meal) => {
          return filter.some((entry) => meal.category === entry);
        })
      );
    }
  };
  useEffect(() => {
    filterCategory();
    filterMealList();
  }, [tagData]);

  const onSearch = async (keyword) => {
    const auth = localStorage.getItem("Authorization");
    /*await axios
      .get("http://localhost:8080/store/all")
      .then((res) => {
        console.log(res);
        setSearchResult({ isOpen: true, data: res.data });
      })
      .catch((e) => console.log(e));*/
    await axios
      .get(`http://localhost:8080/post/search?store=${keyword}`, {
        headers: {
          Authorization: auth,
        },
      })
      .then((res) => {
        console.log(res);
        setSearchResult({ isOpen: true, data: res.data });
      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <TopBarDiv isOpen={searchResult.isOpen}>
        <TitleWrapper>방 조회</TitleWrapper>
        <CloseDiv>
          <FontAwesomeIcon
            icon={solid("x")}
            onClick={() =>
              setSearchResult((cur) => ({ ...cur, isOpen: false }))
            }
          ></FontAwesomeIcon>
        </CloseDiv>
        {searchResult && (
          <ResultUl>
            {searchDetail.isOpen && (
              <BackButton>
                <FontAwesomeIcon
                  icon={solid("chevron-left")}
                  onClick={() => setSearchDetail({ isOpen: false, data: {} })}
                />
              </BackButton>
            )}
            {searchDetail.isOpen ? (
              <SearchDetail />
            ) : (
              searchResult.data.map((post) => <SearchItem post={post} />)
            )}
          </ResultUl>
        )}
      </TopBarDiv>

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

export const FlexRowDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;
export const FlexColDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const BackButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: 1rem;
  left: 1rem;
`;
const ResultUl = styled.ul`
  position: relative;
  width: 520px;
  height: 550px;
  border: solid rgba(0, 0, 0, 0.4) 2px;
  text-align: left;
  overflow-y: auto;
  padding: 10px 0;
`;
const TitleWrapper = styled.h2`
  width: 100%;
  text-align: center;
`;
const CloseDiv = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 5px;
  background-color: ${COLOR.RED_PINK};
  color: ${COLOR.WHITE};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  right: 15px;
  top: 5px;
`;
const TopBarDiv = styled.div`
  width: 100%;
  margin: 0;
  padding-top: 1rem;
  height: 650px;
  position: absolute;
  background-color: white;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 97;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  transition: all 0.5s ease-out;
  ${(props) =>
    props.isOpen
      ? css`
          top: 120px;
        `
      : css`
          top: -700px;
        `}
`;
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
