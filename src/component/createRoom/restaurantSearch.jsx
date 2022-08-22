import React from "react";
import { useState } from "react";
import Tag from "../common/Tag";
import styled from "styled-components";
import axios from "axios";
import { useRef } from "react";

const RestaurantSearch = ({ stores, setStores }) => {
  const [tagData, setTagData] = useState([
    { name: "한식", eng: "korean", isClicked: true },
    { name: "양식", eng: "western", isClicked: true },
    { name: "중식", eng: "chinese", isClicked: true },
    { name: "일식", eng: "japanese", isClicked: true },
    { name: "야식", eng: "midnight", isClicked: true },
    { name: "기타", eng: "etc", isClicked: true },
  ]);
  const searchTag = useRef("all");
  const onSearch = async () => {
    for (let i = 0; i < 6; i++) {
      if (tagData[i].isClicked) {
        searchTag.current = tagData[i].eng;
        break;
      }
    }
    await axios
      .get(`http://localhost:8080/store/${searchTag.current}`)
      .then((res) => setStores(res.data))
      .catch((e) => console.log(e));
  };
  const onTagClick = (e) => {
    const idx = parseInt(e.target.dataset.key);
    setTagData((cur) =>
      cur.map((d, key) => (key === idx ? { ...d, isClicked: !d.isClicked } : d))
    );
  };
  return (
    <SearchContainer>
      <InputWrapper type="text" name="restaurant" />
      <Button onClick={onSearch}>검색</Button>
      <TagWrapper>
        {tagData.map((data, key) => (
          <Tag
            title={data.name}
            isClicked={data.isClicked}
            dataKey={key}
            key={key}
            onClick={onTagClick}
          />
        ))}
      </TagWrapper>
    </SearchContainer>
  );
};

export default RestaurantSearch;

const InputWrapper = styled.input`
  display: inline-block;
  margin-top: 2rem;
`;
const TagWrapper = styled.div`
  margin-top: 1rem;
`;
const Button = styled.button`
  display: inline-block;
`;
const SearchContainer = styled.div`
  text-align: center;
`;
