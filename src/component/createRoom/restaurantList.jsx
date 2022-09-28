import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import SelectedMenu from "./selectedMenu";
const dummy = [
  {
    id: 1,
    name: "탄탄면공방 서울숲점",
    category: "CHINESE",
    deliveryFee: 5000,
  },
  {
    id: 2,
    name: "더진국수육국밥 건국대점",
    category: "KOREAN",
    deliveryFee: 4000,
  },
  {
    id: 3,
    name: "홍콩반점 건대입구역점",
    category: "CHINESE",
    deliveryFee: 5000,
  },
];
const categoryData = {
  CHINESE: "중식",
  KOREAN: "한식",
  JAPANESE: "일식",
  WESTERN: "양식",
  MIDNIGHT: "야식",
  ETC: "기타",
};
Object.freeze(categoryData);

const RestaurantList = ({ stores, setStores }) => {
  const [selectedSpot, setSelectedSpot] = useState(null);
  useEffect(() => {
    const fetchStores = async () => {
      await axios
        .get("http://localhost:8080/store/all")
        .then((res) => setStores(res.data))
        .catch((e) => console.log(e));
    };
    fetchStores();
  }, []);
  return (
    <ListWrapper>
      <List>
        {stores.map((data) => {
          return (
            <Entry
              key={data.id}
              onClick={() =>
                setSelectedSpot({
                  id: data.id,
                  name: data.name,
                  category: categoryData[data.category],
                  deliveryFee: data.deliveryFee,
                })
              }
            >
              <Title>{data.name}</Title>
              <TagStyle>{categoryData[data.category]}</TagStyle>
              <span>배달비: {data.deliveryFee}</span>
            </Entry>
          );
        })}
      </List>
      {selectedSpot && <SelectedMenu selectedSpot={selectedSpot} />}
    </ListWrapper>
  );
};

export default RestaurantList;

const ListWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
  border: solid rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;
const Entry = styled.li`
  height: 3rem;
  border: solid rgba(0, 0, 0, 0.2);
  margin: 0.5px 0;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 0.5rem;
`;
const List = styled.ul`
  width: 50%;
  heigth: 100%;
  border-right: solid black;
  background-color: white;
  overflow-y: auto;
`;

export const TagStyle = styled.span`
  display: inline-block;
  background-color: lightseagreen;
  color: white;
  vertical-align: middle;
  text-align: center;
  border-radius: 1rem;
  width: 2rem;
  height: 1rem;
  line-height: 1rem;
`;
const Title = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  max-width: 40%;
`;
